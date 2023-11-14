const cloudinary = require('cloudinary').v2

exports.uploadImagetoCloudinary = async (file, folder, height, quality) => {

    console.log("1")
    const options = {folder};
    if(height) {
        options.height = height;
    }
    if(quality) {
        options.quality = quality;
    }
    console.log("2")
    options.resource_type = "auto";
    console.log("3")

    return await cloudinary.uploader.upload(file.tempFilePath, options);

}