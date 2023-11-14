const nodemailer = require('nodemailer');
require("dotenv").config();

const mailSender = async(email , title , body) => {
    try{


        const transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASS
            }
        })

       let info = await transporter.sendMail({
         
        from : "StudyNotion - by Mushhh",
        to : `${email}`,
        subject : `${title}`,
        html :`${body}`,


       })
       
    //    console.log(" I am Info of MailSender : " , info);
       return info;

    }
    catch(err){
     console.log("Error in mailsender");
     console.log(err.message);
    }
}

module.exports = mailSender;