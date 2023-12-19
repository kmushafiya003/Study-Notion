import {studentEndpoints} from '../apiLinks'
import { toast } from 'react-hot-toast'
import { apiConnector } from '../apiConnector'
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import {setPaymentLoading} from '../../redux/slices/courseSlice'
import { resetCart } from '../../redux/slices/cartSlice';

const {
    COURSE_PAYMENT_API ,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API

} = studentEndpoints;
 
function loadScript(src) {

     return new Promise((resolve) => {

        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {

            resolve(true);
        }

        script.onerror = () => {

            resolve(false);
        }

        document.body.appendChild(script);

     })
}

export async function buyCourse( token, courses , userDetails , navigate , dispatch){

    const toastId = toast.loading("Loading...");

    try{
       
        //load the script 
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        // console.log("Load script res : " , res);

        if(!res){
         toast.error("Razorpay SDK failed to load")
         return;
        }

        //initiate the order

   

        const orderResponse = await apiConnector("POST" , COURSE_PAYMENT_API , {courses} , {
            Authorization : `Bearer ${token}`
        } );



        if(!orderResponse.data.success){
            console.log("Capture payment ke throw wali filed e meirror");

            throw new Error(orderResponse.data.message);
        }


        // console.log("Order Response : " , orderResponse);

        //order response

        // amount: 499900
        // ​​​
        // amount_due: 499900
        // ​​​
        // amount_paid: 0
        // ​​​
        // attempts: 0
        // ​​​
        // created_at: 1702216060
        // ​​​
        // currency: "INR"
        // ​​​
        // entity: "order"
        // ​​​
        // id: "order_NAfFXei4Ukvbum"
        // ​​​
        // notes: Array []
        // ​​​
        // offer_id: null
        // ​​​
        // receipt: "0.23896684270168644"
        // ​​​
        // status: "created"



        //options 
        const RAZORPAY_KEY = "rzp_test_mJSAEPGocIbFxJ"

        const options = {
            key : RAZORPAY_KEY ,
            currency : orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id :  orderResponse.data.data.id,
            name:  "StudyNotion"  ,
            description : "Thank You for Purchasing the Course",
            image : rzpLogo  ,
            prefill : {
                name : `${userDetails.firstName}` + " " + `${userDetails.lastName}`,
                email : `${userDetails.email}`
            },
            
            handler :function(response) {
                
                //send successfull  mail
           

                sendPaymentSuccessfullEmail(response , orderResponse.data.data.amount, token)


                //verifyPayment

                verifyPayment({...response , courses }, token , navigate , dispatch);
            }

        }

        //open razorpay modal

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();
        paymentObject.on("payment.failed" , function(response) {
            toast.error("Oops , Payment failed");
            console.log(response.error);
        })


        
       


    }catch(err){

        console.log("Payment Api Error : " , err);
        toast.error("Could not make payment");
        
    }

    toast.dismiss(toastId);

}


// successfull payment email function

async function sendPaymentSuccessfullEmail(response , amount , token){

    //response send the razorpay order id , razorpay payment id and signature
    // console.log("Response which is passed as parameter in option handler : " , response);
   

    try{

        console.log("Response which is passed as parameter in option handler : " , response);
        

        await apiConnector("POST" , SEND_PAYMENT_SUCCESS_EMAIL_API , {
            orderId: response.razorpay_order_id,
            paymentId : response.razorpay_payment_id ,
            amount ,
        } ,{
            Authorization : `Bearer ${token}`
        })

    }catch(err){
        console.log("Payment Success Email Error");
    }

}


// verifyPayment function

async function verifyPayment(bodyData , token , navigate , dispatch){

    const toastId = toast.loading("Verifying Payment .....");
    dispatch(setPaymentLoading(true));

    try{

        
        const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData , {
            Authorization :`Bearer ${token}`
        })



        if(!response.data.success){
            console.log("Throw wali filed mei error of verify Payment");
            throw new Error (response.data.message);
        }


        toast.success("Payment Successfull , You are added to the course");
        navigate("/dashboard/enrolled-courses");

        dispatch(resetCart());


    }catch(err){

        console.log("Payment Verify Error : " , err);
        toast.error("Could not verify payment");

    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));


}





