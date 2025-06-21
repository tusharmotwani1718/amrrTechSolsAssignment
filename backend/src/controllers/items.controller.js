import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/items.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import sendTestEmail from "../utils/nodemailer.js";

// This file contains the controllers for handling item-related operations

// controllers:

// 1. Get Items from the list:
const getItems = asyncHandler(async (req, res) => {

    const items = await Item.find({});

    if (!items) {
        throw new ApiError(404, "Error fetching items");
    }



    return res
        .status(201)
        .json(new ApiResponse(201, items, "Items fetched successfully"));

})

// 2. Add Items to the list:
const addItem = asyncHandler(async (req, res) => {
    const { name, desc, price, itemType, stockAvailable } = req.body;

    const itemExists = await Item.findOne({ name });
    if (itemExists) {
        throw new ApiError(400, "Item already exists");
    }

    const coverImageLocalPath = req.files && req.files.coverImage ? req.files.coverImage[0].path : null;
    const additionalImagesLocalPaths = req.files && req.files.additionalImages ? req.files.additionalImages.map(file => file.path) : [];

    const coverImageUploadResult = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null;

    const coverImageUrl = coverImageUploadResult?.secure_url || null;
    if (!coverImageUrl) {
        throw new ApiError(400, "Cover image upload failed");
    }

    const additionalImageUrls = additionalImagesLocalPaths.length > 0
        ? await Promise.all(
            additionalImagesLocalPaths.map(async (path) => {
                const result = await uploadOnCloudinary(path);
                return result?.secure_url;
            })
        )
        : [];

    if (!coverImageLocalPath || !name || !desc || !price || !stockAvailable) {
        throw new ApiError(400, "Please provide all required fields");
    }

    const newItem = await Item.create({
        name,
        description: desc,
        price,
        coverImage: coverImageUrl,
        stockAvailable,
        additionalImages: additionalImageUrls,
        itemType: itemType || "Others"
    })

    if (!newItem) {
        throw new ApiError(500, "Error adding item");
    }

    return res.status(201).json(
        new ApiResponse(201, newItem, "Item added successfully")
    );
})



// 3. Delete Items from the list:
const deleteItem = asyncHandler(async (req, res) => {
    const { id } = req.params;


    if (!id) {
        throw new ApiError(400, "Invalid item ID");
    }
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    return res.status(200).json(new ApiResponse(200, null, "Item deleted successfully"));
})


// 4. Get an item by ID (if needed):
const getItemById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Invalid item ID");
    }

    const item = await Item.findById(id);
    if (!item) {
        throw new ApiError(404, "Item not found");
    }

    return res.status(200).json(new ApiResponse(200, item, "Item fetched successfully"));
})

// 5. Send mail to the user:
const sendEnquireEmail = asyncHandler(async (req, res) => {

    const { receiverEmail } = req.body;

    if (!receiverEmail) {
        throw new ApiError(400, "Receiver email is required.");
    }





    const content = `
        <!DOCTYPE html>
    <html>
    <head>
    <style>
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2c3e50; text-align: center; }
        .button { 
            display: inline-block; 
            padding: 12px 24px; 
            background-color: #3498db; 
            color: white !important; 
            text-decoration: none; 
            border-radius: 4px; 
            font-weight: bold; 
            margin: 20px 0; 
        }
        .footer { 
            margin-top: 30px; 
            font-size: 12px; 
            color: #7f8c8d; 
            text-align: center; 
        }
        .container { 
            border: 1px solid #ecf0f1; 
            padding: 30px; 
            border-radius: 8px; 
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1 class="header">Thanks for Enquiring of the Product.</h1>

        <p>We appreciate your interest in our product. Our team will get back to you shortly with more information.</p>


        <div class="footer">
            <p>© 2025 AMRR TechSols. All rights reserved.</p>
        </div>
    </div>
    </body>
    </html>
    `

    const mail = await sendTestEmail(content, receiverEmail);
    // console.log(mail);
    if (!mail) {
        throw new ApiError(400, "Error while sending email.");
    }

    res
        .status(200)
        .json(
            new ApiResponse(201, mail, "Email sent successfully")
        );


})





export {
    getItems,
    addItem,
    deleteItem,
    getItemById,
    sendEnquireEmail
}
