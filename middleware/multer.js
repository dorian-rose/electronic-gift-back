const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});




//see multer documentation 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/uploads"));
    },
    filename: function (req, file, cb)  {
        
        cb(null, new Date().toISOString()+"-"+ file.originalname);
    }
});




//validation
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    } else {
        cb({ message: "unsupported file format" }, false)
    }
}

const uploadMiddleware = multer({ storage: storage, limits: { fileSize: 1024 }, fileFilter: fileFilter });

module.exports = { uploadMiddleware };