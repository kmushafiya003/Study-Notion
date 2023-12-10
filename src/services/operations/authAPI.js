import { apiConnector } from '../apiConnector';
import { authEndpoints } from '../apiLinks'
import { setLoading, setToken } from '../../redux/slices/authSlice'
import { setUser } from '../../redux/slices/profileSlice'
import { resetCart } from '../../redux/slices/cartSlice'

import { toast } from 'react-hot-toast'




const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API
} = authEndpoints






//------------------------ Send Otp  ---------------------------------

export function sendOtp(email, navigate) {
  return async (dispatch) => {

    const toastId = toast.loading("Loading....");
    dispatch(setLoading(true))

    try {

      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      });

      console.log("Send Otp Response : ", response);

      if (!response.data.success) {
        console.log("Throw wale error mei hai")
        throw new Error(response.data.message);

      }

      toast.success("OTP Send Successfully");

      navigate("/verify-email");


    } catch (err) {

      console.log("Error in Calling Send otp APi : ", err);
      toast.error(err.message);
      console.log(err.message);
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId)
  }
}

//---------------------------- SignUp ---------------------------------------

export function signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading...");

    dispatch(setLoading(true))

    try {

      const response = await apiConnector("POST", SIGNUP_API, {

        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp

      });
      console.log("SignUp Response : ", response);



      if (!response.data.success) {
        console.log("Throw Error wali field mei hai");
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }



      toast.success("Sign Up Successfully");
      navigate("/login");


    } catch (err) {
      console.log("Error in SignUp API CALL: ", err);
      toast.error(err.message);
      console.log(err.message);
      navigate("/signup");
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId);
  }
}

// ----------------------------- Login -------------------------------------

export function login(email, password, navigate) {

  return async (dispatch) => {

    const toastId = toast.loading("Loading....")
    dispatch(setLoading(true));

    try {

      const response = await apiConnector("POST", LOGIN_API, { email, password });
      console.log("Login API response : ", response);

      if (!response.data.success) {
        console.log("Throw Error wale case mei hai");
        throw new Error(response.data.message);
      }

      toast.success("Login Successfully");

      dispatch(setToken(response.data.token));
      localStorage.setItem("token", JSON.stringify(response.data.token));

      
      const userImage = response.data?.user?.image ?
        response.data?.user?.image :
        `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`

      dispatch(setUser({ ...response.data?.user, image: userImage }));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      



      navigate("/dashboard/my-profile")

    } catch (err) {
      console.log("Error in calling Login API : ", err);
      toast.error(err.message);
      console.log(err.message)

    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}


//------------------------ Logout  --------------------------------

export function logout(navigate) {

 

  return async (dispatch) => {
    
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged Out");
    navigate("/");
  }

}



// --------------------------  Reset password Token ------------------------------- 

export function getResetPasswordToken(email, setEmailSent) {

  return async (dispatch) => {

    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
      console.log("Reset Password Token Response : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);

    } catch (err) {

      console.log("Error in Reset Password Token ");
      console.log(err);
      toast.error(err.message);

    }
    dispatch(setLoading(false))
  }
}

// --------------------------- Reset Password ----------------------------------

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {

    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token });
      console.log("Response of reset Password : ", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password has been reset successfully");
      navigate("/login");


    } catch (err) {
      console.log("Error in Resetting Password: ", err);
      console.log(err.message);
      toast.error(err.message)
    }
    dispatch(setLoading(false));
  }
}






