const express = require('express');
const app = express();

const database = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require("dotenv").config();

database.dbConnect();

//import all routes
const courseRoute = require('./routes/Course');
const paymentRoute = require('./routes/Payment');
const profileRoute = require('./routes/Profile');
const userRoute = require('./routes/User');
const contactRoute = require('./routes/Contact');

const PORT = process.env.PORT || 4000;


//all parser

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: "/tmp",
}))

app.use(cors({
	origin:"http://localhost:3000",
		credentials:true,
}))

//all router with mounting

app.use("/api/v1/auth" , userRoute);
app.use("/api/v1/profile" , profileRoute);
app.use("/api/v1/payment" , paymentRoute);
app.use("/api/v1/course" , courseRoute);
app.use("/api/v1/reach" , contactRoute);


//db call



//cloudinary call
cloudinaryConnect();


//default route

app.get("/" , (req , res)=> {
	return res.json({
        success : true,
		message : "Your Server is up and running ......."
	})
} )


app.listen(PORT , ()=> {
	console.log("Server Connected Successfully");
})




