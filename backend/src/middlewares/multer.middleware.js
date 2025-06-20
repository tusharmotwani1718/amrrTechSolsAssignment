import multer from "multer";
import { Item } from "../models/items.model.js";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "./public/temp") // files are stored temporarily after uploading on multer and then removed after uploading on cloudinary from multer.
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file naming
    },
})





export const uploadMedia = multer({
    storage
})