const { instance } = require('../config/razorpay');
const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');

//capture the Payment and initiate the Razorpay Order

exports.capturePayment = async (req, res) => {
    try {
        //fetch userId and courseId
        const { courseId } = req.body;
        const userId = req.user.id;

        //validation
        //valid CourseId
        if (!courseId) {
            console.log("Course Id Not found");
            return res.status(400).json({
                success: false,
                message: "Please enter Valid Course Id"
            })
        }
        //valid Coursedetail
        let course;
        try {

            course = await Course.findById(courseId);

            if (!course) {
                console.log("Course Details Not Found");
                return res.status(400).json({
                    success: false,
                    message: "Course Details Not found"
                })
            }

            //User already pay for the Course or not

            const uId = new mongoose.Types.ObjectId(userId);

            if (course.studentsEnrolled.includes(uId)) {
                console.log("Student is Already Enrolled");
                return res.status(400).json({
                    success: false,
                    message: "Student is Already Enrolled"
                })
            }

        } catch (err) {
            console.log("An Error occur while validating for course ")
            return res.status(400).json({
                success: false,
                message: "An Error occur while validating for course ",
                error: err.message,
            })
        }



        //create a Razorpay Order


        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: courseId,
                userId: userId,
            }
        };

        try {

            //initiate the payment using Razorpay

            const paymentResponse = await instance.orders.create(options);
            console.log("Payment Response : ", paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                amount: paymentResponse.amount
            });

        } catch (err) {

            console.log("An error occur while initiating a order with razorpay , Error : ", err);
            return res.status(400).json({
                success: false,
                message: "An error occur while initiating with razorpay",
                error: err.message
            })

        }



    } catch (err) {
        console.log("An Error Occur while cappturing the Payment");
        return res.status(500).json({
            success: false,
            message: "An Error Occur while cappturing the Payment",
            error: err.message,
        })
    }
}




//Verfiy Signature of Razorpay and Server

//sha - Secure Hashing Algorithm -> Hash the given data in secure format

//Hmac - It acts like a container which contains Hashing algorithm and SECRET_KEY -It also hash the data in secure format.The only diff is that it contain SECRET_KEY

//TODO : What is Checksum

exports.verifySignature = async (req, res) => {
    try {

        const webhookSecret = "1234567";

        const signature = req.headers["x-razorpay-signature"];

        //There are three steps for hashing the secret key(Secret Algo) of our server....because razorpay send this key in encrypted format ,so we have to hash our server secret key for verifying

        //Step1
        const shaSum = crypto.createHmac("sha256", webhookSecret);

        //Step2
        shaSum.update(JSON.stringify(req.body));

        //Step3 :
        const digest = shaSum.digest("hex");


        if (signature === digest) {

            console.log("Payment is Authorised");

            //fetch courseId and userId from notes

            const { courseId, userId } = req.body.payload.payment.entity.notes;

            try {

                //fulfill the action

                //find the course and enroll the student in it
                const enrolledCourse = await Course.findByOneAndUpdate(
                    { _id: courseId },
                    {
                        $push: {
                            studentsEnrolled: userId,
                        }
                    },
                    { new: true },
                )

                //verifying for enrolled Course

                if (!enrolledCourse) {
                    console.log("No Course fond with this course Id");
                    return res.status(500).json({
                        success: false,
                        message: "Course Not Found",
                    })
                }

                console.log("Enrolled Course : ", enrolledCourse);

                //FInd the student and add the course to thier enrolled course list

                const enrolledStudent = await User.findByOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            courses: courseId
                        }
                    },
                    { new: true }
                )

                console.log("Enrolled Student : ", enrolledStudent);


                //send confirmation mail to the user

                const mailResponse = await mailSender(
                    enrolledStudent.email ,
                    "Congratulation from StudyNotion",
                    "Congratulations , You are onboarded into new Course ",

                     );

                console.log("Mail Response : " , mailResponse);

                return res.status(200).json({
                    success : true,
                    message : "Signature Verified and Course Added Successfully"
                })

            } catch (err) {

                console.log("Something went wrong while enrolling  you to the course")
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong while verifying signature of Razorpay",
                    error: err.message,
                })


            }

        }

        else {
            console.log("Signature Not matched");
            return res.status(400).json({
                success : false,
                message : "Signature Not matched , Invalid Request"
            })
        }




    } catch (err) {
        console.log("Something went wrong while verifying signature of Razorpay")
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying signature of Razorpay",
            error: err.message,
        })
    }
}


