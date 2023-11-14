
const mailSender = require("../utils/mailSender");
const {contactUsEmail} = require('../mail/templates/contactUsEmail');
const {contactUsEmailRes} = require('../mail/templates/contactUsEmailResponse')
require("dotenv").config();

exports.contactUs = async (req, res) => {

    try {

        const adminEmail = process.env.MAIL_USER
        console.log("Inside Contact Us API");

        //fetch data from req body

        const { firstName, lastName, email, countryCode, phoneNo, message } = req.body;



        const emailtoUs = await mailSender(adminEmail, `Message from ${firstName} ${lastName}`, contactUsEmail(firstName, lastName, email, phoneNo, message));


        console.log("Email to admin : ", emailtoUs);

        const emailRes = await mailSender(email, `Your data send successfully`, contactUsEmailRes(firstName, lastName, email, phoneNo, message));

        console.log("Email Response to user : ", emailRes);

        return res.status(200).json({
            success: true,
            message: "Email Send Successfully",
        })



    } catch (err) {
        console.log("Error in Contact Us API: ", err);
        return res.status(500).json({
            success: false,
            message: "Couldn't Send Mail to StudyNotion",
            error: err.message,
        })
    }
}
