const { instance } = require('../config/razorpay');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { paymentSuccessEmail} = require('../mail/templates/paymentSuccessfullEmail')
const crypto = require("crypto");



//-------------------------- multiple courses ------------------------------------------

//initiate the razorpay order for buying multiple orders

exports.capturePayment = async(req ,res) => {

    const {courses} = req.body;
    const userId = req.user.id;

    //validation on courses


    if(courses.length === 0) {
        console.log("No courses selected for buy");

        return res.status(404).json({
            success : false,
            message : "Please Provide Courses for purchasind"
        })
    }

    let totalAmout = 0;


    //loop for traversing to all courses for totalAmount



    for(const course_id of courses){

        let course;

        try{


        course = await Course.findById(course_id);

        //validation on course


        if(!course){
            console.log("Course Not found with this ID : " , course_id);

            return res.status(404).json({
                success : false,
                message : "Could not find the course",
            })
        }

      

        const uid = new mongoose.Types.ObjectId(userId);

        if(course.studentsEnrolled.includes(uid)){
            console.log("User already enrolled the course");
            return res.status(401).json({
                success : false,
                message : "Student is already enrolled "
            })

        }



        totalAmout += course.price ;

        }catch(err){

            console.log("Error while initiating the razorpay order");

            return res.status(500).json({
                success : false,
                message : "Error while initiating the razorpay order",
                error : err.message,
            })

        }
    }

    //Now create the order

    //for order , first create the options

    const options = {
        amount : totalAmout * 100 ,
        currency : "INR" ,
        receipt : Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        // console.log("Payment response : " , paymentResponse);

        res.status(200).json({
            success : true,
            data: paymentResponse,
            message:"Initiate the order successfully"
        })

    }catch(err){

        console.log("Error while payment Response");
        return res.status(500).json({
            success : false,
            message : "Could not initiate the order",
            error : err.message ,
        })

    }


}


//verify  the payment

exports.verifyPayment = async(req , res) => {

    

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const  razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;

    const userId = req.user.id;

    //validation

    if(!razorpay_order_id ||
       !razorpay_payment_id ||
       !razorpay_signature ||
       !courses ||
       !userId ){
        console.log("Payment Failed");
        return res.status(402).json({
            success : false,
            message : "Payment Failed"
        })
       }

    let body = razorpay_order_id + "|" + razorpay_payment_id ;

         
    const expectedSignature = crypto
          .createHmac("sha256" , process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

    
    if(expectedSignature === razorpay_signature){

        //if equal hai to enroll karao students ko

     await enrollStudents(courses, userId , res);

        //return response
        return res.status(200).json({
            success : true,
            message : "Payment Verified",
        })
    }

    return res.status(400).json({

        success : false,
        message : "Payment Failed"

    })
   


}
exports.verifyPayment = async(req , res) => {

    

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const  razorpay_signature = req.body?.razorpay_signature;

    const courses = req.body?.courses;

    const userId = req.user.id;

    //validation

    if(!razorpay_order_id ||
       !razorpay_payment_id ||
       !razorpay_signature ||
       !courses ||
       !userId ){
        console.log("Payment Failed");
        return res.status(402).json({
            success : false,
            message : "Payment Failed"
        })
       }

    let body = razorpay_order_id + "|" + razorpay_payment_id ;

         
    const expectedSignature = crypto
          .createHmac("sha256" , process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

    
    if(expectedSignature === razorpay_signature){

        //if equal hai to enroll karao students ko

     await enrollStudents(courses, userId , res);

        //return response
        return res.status(200).json({
            success : true,
            message : "Payment Verified",
        })
    }

    return res.status(400).json({

        success : false,
        message : "Payment Failed"

    })
   


}



//enroll the student to the given course

const enrollStudents = async(courses , userId , res)=> {


     
   if(!courses || !userId){
    console.log("Please provide require data");
    return res.status(400).json({
        success : false,
        message : "Please provide require data"
    })
   }

   

   //Traversing to all courses for enrolling

   for(const courseId of courses){
 


     try{

            //find the course and enrolled the student in it

            


    const enrolledCourse = await Course.findOneAndUpdate(
        {_id : courseId} ,
        {$push : { studentsEnrolled : userId}},
        { new : true },
    )

    

 

    if(!enrolledCourse){
        console.log("Enrolled Course not found");
        return res.status(500).json({
            success : false,
            message :"Enrolled Course not found"
        })
    }

    //find the student and add the course to their course list

    const enrolledStudent = await User.findByIdAndUpdate(userId , {
        $push : {
            courses : courseId
        }},
        {
            new : true,
        }
    );



    if(!enrolledStudent){
        console.log("Enrolled Student not found");
        return res.status(500).json({
            success : false,
            message :"Enrolled Student not found"
        })
    }

    //Now send the mail to the enrolled student

    const emailResponse = await mailSender(
        enrolledStudent.email ,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstName}`)

    )

    console.log("Email Sent Successfully : " , emailResponse.response);
        
     }catch(err){
       
        console.log("Error while enrolling student to the course");

        return res.status(500).json({
            success : false,
            message : "Error while enrolling student to the course",
            error : err.message
        })

     }

   }
}


//send successfull payment email

exports.sendPaymentSuccessEmail = async(req , res) => {

    const {orderId , paymentId , amount} = req.body;
    // const {orderId, paymentId, amount} = req.body;

    console.log("Suuccessfull email mei");
    // console.log("Order_id : " , orderId);
    // console.log("payment_id : " , paymentId );

    const userId = req.user.id;
    if(!orderId , !paymentId , !amount , !userId){

        console.log("All fields are required");
        return res.status(401).json({
            success : false,
            message : "Please Provide all the fields"
        })
    }

    try{

        //find the enroll student

        const enrollStudent = await User.findById(userId);

        await mailSender(
            enrollStudent.email ,
            "Payment Received",
            paymentSuccessEmail(`${enrollStudent.firstName}` , amount/100 , orderId , paymentId)

        )



    }catch(err){

        console.log("Error while sending payment successfull api");
        return res.status(500).json({
            success : false,
            message : " Could not send the successfull payment email",
            error : err.message,
        })
    }
}






















// ------------------------------ Single courses ----------------------------------------------



////initiate the razorpay order for buying single orders

// exports.capturePayment = async (req, res) => {
//     try {
//         //fetch userId and courseId
//         const { courseId } = req.body;
//         const userId = req.user.id;

//         //validation
//         //valid CourseId
//         if (!courseId) {
//             console.log("Course Id Not found");
//             return res.status(400).json({
//                 success: false,
//                 message: "Please enter Valid Course Id"
//             })
//         }
//         //valid  Coursedetail
//         let course;
//         try {

//             course = await Course.findById(courseId);

//             if (!course) {
//                 console.log("Course Details Not Found");
//                 return res.status(400).json({
//                     success: false,
//                     message: "Course Details Not found"
//                 })
//             }

//             //User already pay for the Course or not

//             const uId = new mongoose.Types.ObjectId(userId);

//             if (course.studentsEnrolled.includes(uId)) {
//                 console.log("Student is Already Enrolled");
//                 return res.status(400).json({
//                     success: false,
//                     message: "Student is Already Enrolled"
//                 })
//             }

//         } catch (err) {
//             console.log("An Error occur while validating for course ")
//             return res.status(400).json({
//                 success: false,
//                 message: "An Error occur while validating for course ",
//                 error: err.message,
//             })
//         }



//         //create a Razorpay Order
    
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency: currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: courseId,
//                 userId: userId,
//             }
//         };

//         try {

//             //initiate the payment using Razorpay

//             const paymentResponse = await instance.orders.create(options);
//             console.log("Payment Response : ", paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency: paymentResponse.currency,
//                 amount: paymentResponse.amount
//             });

//         } catch (err) {

//             console.log("An error occur while initiating a order with razorpay , Error : ", err);
//             return res.status(400).json({
//                 success: false,
//                 message: "An error occur while initiating with razorpay",
//                 error: err.message
//             })

//         }



//     } catch (err) {
//         console.log("An Error Occur while cappturing the Payment");
//         return res.status(500).json({
//             success: false,
//             message: "An Error Occur while cappturing the Payment",
//             error: err.message,
//         })
//     }
// }



// ---------------------------------------------------------------------------------------------


//Verfiy Signature of Razorpay and Server

//sha - Secure Hashing Algorithm -> Hash the given data in secure format

//Hmac - It acts like a container which contains Hashing algorithm and SECRET_KEY -It also hash the data in secure format.The only diff is that it contain SECRET_KEY

//TODO : What is Checksum

// exports.verifySignature = async (req, res) => {
//     try {

//         const webhookSecret = "1234567";

//         const signature = req.headers["x-razorpay-signature"];

//         //There are three steps for hashing the secret key(Secret Algo) of our server....because razorpay send this key in encrypted format ,so we have to hash our server secret key for verifying

//         //Step1
//         const shaSum = crypto.createHmac("sha256", webhookSecret);

//         //Step2
//         shaSum.update(JSON.stringify(req.body));

//         //Step3 :
//         const digest = shaSum.digest("hex");


//         if (signature === digest) {

//             console.log("Payment is Authorised");

//             //fetch courseId and userId from notes

//             const { courseId, userId } = req.body.payload.payment.entity.notes;

//             try {

//                 //fulfill the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findByOneAndUpdate(
//                     { _id: courseId },
//                     {
//                         $push: {
//                             studentsEnrolled: userId,
//                         }
//                     },
//                     { new: true },
//                 )

//                 //verifying for enrolled Course

//                 if (!enrolledCourse) {
//                     console.log("No Course found with this course Id");
//                     return res.status(500).json({
//                         success: false,
//                         message: "Course Not Found",
//                     })
//                 }

//                 console.log("Enrolled Course : ", enrolledCourse);

//                 //FInd the student and add the course to thier enrolled course list

//                 const enrolledStudent = await User.findByOneAndUpdate(
//                     { _id: userId },
//                     {
//                         $push: {
//                             courses: courseId
//                         }
//                     },
//                     { new: true }
//                 )

//                 console.log("Enrolled Student : ", enrolledStudent);


//                 //send confirmation mail to the user

//                 const mailResponse = await mailSender(
//                     enrolledStudent.email ,
//                     "Congratulation from StudyNotion",
//                     "Congratulations , You are onboarded into new Course ",

//                      );

//                 console.log("Mail Response : " , mailResponse);

//                 return res.status(200).json({
//                     success : true,
//                     message : "Signature Verified and Course Added Successfully"
//                 })

//             } catch (err) {

//                 console.log("Something went wrong while enrolling  you to the course")
//                 return res.status(500).json({
//                     success: false,
//                     message: "Something went wrong while verifying signature of Razorpay",
//                     error: err.message,
//                 })


//             }

//         }

//         else {
//             console.log("Signature Not matched");
//             return res.status(400).json({
//                 success : false,
//                 message : "Signature Not matched , Invalid Request"
//             })
//         }




//     } catch (err) {
//         console.log("Something went wrong while verifying signature of Razorpay")
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while verifying signature of Razorpay",
//             error: err.message,
//         })
//     }
// }


