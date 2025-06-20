import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/items.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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





export {
    getItems,
    addItem,
    deleteItem
}
