import { setLoading, setUser } from '../../redux/slices/profileSlice'
import { settingsEndpoints } from '../apiLinks'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiConnector'
import { resetCart } from '../../redux/slices/cartSlice'
import { setToken } from '../../redux/slices/authSlice'



const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,

} = settingsEndpoints



// ---------------- UPDATE PROFILE PICTURE ----------------------


export function updateDisplayPicture(token, formData) {

    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        console.log("token: ", token);

        try {
            console.log("Services ke function mei hu")

            const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, formData, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });

            console.log("Upload display picture Response : ", response);

            if (!response.data.success) {
                console.log("Throw filed mei");
                throw new Error(response.data.message)
            }



            toast.success("Successfully Uploaded");

            localStorage.setItem("user", JSON.stringify(response.data.data));

            dispatch(setUser(response.data.data));


        } catch (err) {

            console.log("Error in uploading Picture in services : ");
            console.log("Error message : ", err.message);

            toast.error("Uploading failed");

        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}


//------------------ UPDATE OR EDIT PROFILE ------------------------

export function updateProfile(token, formData) {

    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {

            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${token}`
            })

            console.log("Response of edit Profile : ", response);

            if (!response.data.success) {
                console.log("throw wali field mei error aagya");
                throw new Error(response.data.message);
            }

            const userImage = response.data.updateProfileDetails.image ? response.data.updateProfileDetails.image :
                `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUserDetails.firstName} ${response.data.updatedUserDetails.lastName}`

            const updateUser = {
                ...response.data.updateProfileDetails,
                image: userImage
            }

            localStorage.setItem("user",JSON.stringify(updateUser));

            dispatch(setUser(updateUser));

            toast.success("Profile Updated Successfully");


        } catch (err) {
            console.log("Error in services of edit profile");
            console.log(err.message);
            toast.error(err.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


//------------------- Change Password --------------------------

export function changePassword(token , formData){

    return async(dispatch) => {

        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try{

            const response = await apiConnector("POST" , CHANGE_PASSWORD_API , formData , {
                Authorization : `Bearer ${token}`
            })

            console.log("Response of chnage password : " , response);

            if(!response.data.success){
                console.log("Throw wali filed mei error");
                throw new Error(response.data.message);
            }

            toast.success("Password Changed Successfully");


        }catch(err){
            console.log("Error in services of change Password");
            console.log(err.message);
            toast.error("Error while changing password");
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
        
    }
}

// ----------------- Delete Account --------------------------

export function deleteAccount(token , navigate){

    return async(dispatch) => {
       
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try{

            const response = await apiConnector("DELETE", DELETE_PROFILE_API , null , {
                Authorization : `Bearer ${token}`
            });

            console.log("Response of delete API : " , response);

            if(!response.data.success){
              console.log("throw wali field mei error");
              throw new Error(response.data.message);
            }

           
           
                console.log("Account delete mei hai function mei aa gyi")
                dispatch(setToken(null));
                dispatch(setUser(null));
                dispatch(resetCart());
            
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            
                toast.success("Account deleted Successfully");
                navigate("/");
             



        }catch(err){
            console.log("Error in calline delete account api");
            console.log(err.message);
            toast.error("Couldn't delete your acount");
        }

        toast.dismiss(toastId);
        dispatch(setLoading(false));
        
    }
}