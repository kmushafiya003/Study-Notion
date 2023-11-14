const express = require('express');

const router = express.Router();


//import Handler and middleware

// Middleware 

const {auth , isStudent , isInstructor , isAdmin} = require('../middlewares/auth');


//Course 

const {createCourse , showAllCourse , getCourseDetails} = require('../controllers/Course');

// Category 

const {createCategory , showAllCategory , getCategoryPageDetails} = require('../controllers/Category');

//Rating And Reviews 

const {createRating , getAverageRating , getCourseRating , getAllRatingAndReviews} = require('../controllers/RatingAndReview');

// Section and SubSection 

const {createSection , updateSection ,  deleteSection} = require('../controllers/Section');

const {createSubSection , updateSubSection , deleteSubSection} = require('../controllers/SubSection');


//define method , path and handler

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

router.post("/createCourse" , auth , isInstructor , createCourse);
router.get("/showAllCourse" , showAllCourse);
router.post("/getCourseDetails" , getCourseDetails);

router.post("/createSection" , auth , isInstructor , createSection);
router.post("/updateSection" , auth , isInstructor , updateSection);
router.post("/deleteSection" , auth , isInstructor , deleteSection)

router.post("/createSubSection" , auth , isInstructor , createSubSection);
router.post("/updateSubSection" , auth , isInstructor , updateSubSection);
router.post("/deleteSubSection" , auth , isInstructor , deleteSubSection)


// ********************************************************************************************************
//                                      Category Routes
// ********************************************************************************************************

router.post("/createCategory" , auth , isAdmin , createCategory);
router.get("/showAllCategory" , showAllCategory);
router.post("/getCategoryPageDetails" , getCategoryPageDetails);




// ********************************************************************************************************
//                                      RatingAndReview routes
// ********************************************************************************************************

router.post("/createRating" , auth , isStudent , createRating);
router.get("/getAverageRating" , getAverageRating);
router.post("/getCourseRating" , getCourseRating);
router.get("getAllRatingAndReviews" , getAllRatingAndReviews)




module.exports = router;