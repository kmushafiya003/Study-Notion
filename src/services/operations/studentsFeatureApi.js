import {studentEndpoints} from '../apiLinks'
import { toast } from 'react-hot-toast'

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

export async function buyCourse(){

    const toastId = toast.loading("Loading...");
}