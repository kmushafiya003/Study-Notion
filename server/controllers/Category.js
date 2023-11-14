const Category = require('../models/Category')

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
            data : allCategory,
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
        //fetch category ID
        const { categoryId } = req.body;
        //fetch all courses for specified category ID

        const selectedCategory = await Category.findById(categoryId)
            .populate("courses")
            .exec();


        //validation
        //Handle the case when category not found
        if (!selectedCategory) {
            console.log("Category Not Found");
            return res.statu(404).json({
                success: false,
                message: "Category Not Found",
            })
        }

        // Handle the case when there are no courses

        if(selectedCategory.courses.length === 0){

            console.log("Course Not Found with this category");
            return res.statu(404).json({
                success: false,
                message: "Course Not Found with this category",
            })

        }

        const selectedCourses = selectedCategory.courses;

        console.log("Selected Course : " , selectedCourses);

        // Get courses for other categories
        
        const differentCategories = await Category.find({
                                    _id : {$ne : categoryId},
                                     })
                                     .populate("courses")
                                     .exec();

        
        let differentCourses = [];


        for(const category of differentCategories){
            differentCourses.push(...category.courses);
        }



        //get top selling courses

        //HW - write controller for top selling course

        //return response

        return res.status(200).json({
            success : true,
            message : "All type of courses fetched successfully",
            selectedCourses : selectedCourses,
            differentCourses : differentCourses,
        })


    } catch (err) {
        console.log("An error occur on categoryPageDetail");
        return res.status(500).json({
            success: false,
            message: "An error occur on category page detail",
            error: err.message
        })

    }
}