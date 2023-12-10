const Category = require('../models/Category')

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//create Category-> handler function

exports.createCategory = async (req, res) => {
    try {

        //fetch data from req body
        const { name, description } = req.body;

        //validation on data
        if (!name) {
            console.log("All fields Required")
            return res.status(403).json({
                success: false,
                message: "Please Fill all details, All fields are required"
            })
        }

        //create entry on DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        })

        console.log("I am CategoryDetails : ", categoryDetails);

        return res.status(200).json({
            success: true,
            message: "Category Created Successfully"
        })


    } catch (err) {
        console.log("Error in Creating Category : ", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while creating Category"
        })
    }
}


//get all Category -> handler function
exports.showAllCategory = async (req, res) => {
    try {

        const allCategory = await Category.find({}, { name: true, description: true });

        res.status(200).json({
            success: true,
            message: "Successfully all Category are fetched",
            data: allCategory,
        })

    } catch (err) {
        console.log("Error in Showing Category : ", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while fetching all Category"
        })

    }
}


//categoryPageDetails

exports.getCategoryPageDetails = async (req, res) => {
    try {

        // for selected category (data 1)

        //fetch the categoryId from req body
        const { categoryId } = req.body;

        //Now call the Category with given ID and also courses and rattingAndReviews from DB

        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "ratingAndReviews"
                }
            })
            .exec();

        //Handle case when category not found with the given ID

        if (!selectedCategory) {
            console.log("Category not found with the given ID");
            return res.status(404).json({
                success: false,
                message: "Category not found with the given ID",

            })
        }

        //Handle case when there are no courses

        if (!selectedCategory.courses.length === 0) {
            console.log("No Courses found for this category");
            return res.status(404).json({
                success: false,
                message: "No Courses found for this category",

            })
        }

        // console.log("Selected Category : ", selectedCategory);



        //for differentOneRandomCategory --------> (data 2)    

        //Get  other categories execpt selected one

        const categoriesExceptSelected = await Category.find({
            _id: { $ne: categoryId }
        });


        //Now choose any different random category

        const differentCategory = await Category.findOne(
            categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id
        )
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "ratingAndReviews"
                }
            })
            .exec()

        // console.log("Different Category : ", differentCategory);


        //for mostSellingCourse ------------> data(3) 


        //fetch all categories present in DB

        const allCatgeories = await Category.find()
            .populate({
                path: "courses",
                match: { status: "Published" },
                populate: {
                    path: "instructor"
                 
                   
                }
            })
            .exec();
       

        //Now extract all the courses by using flat map on allCategory

        const allCourses = allCatgeories.flatMap((category) => category.courses)
            ;


        //Its time to find most selling courses

        const mostSellingCourses = allCourses
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10);



        // console.log("Most Selling Courses : ", mostSellingCourses)

        //return response

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategory,
                mostSellingCourses,
            }
        })


    } catch (err) {
        console.log("An error occur on categoryPageDetail");

        return res.status(500).json({
            success: false,
            message: "An error occur on categoryPageDetail",
            error: err.message
        })

    }
}