import { v2 as cloudinary } from "cloudinary";
import fs from 'fs' // file system to handle files
import dotenv from 'dotenv';
import sharp from "sharp";
import envconf from "../config/envconf.js"; // Importing environment configuration
import { promises as fsPromises } from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: envconf.cloudinaryCloudName,
    api_key: envconf.cloudinaryApiKey,
    api_secret: envconf.cloudinaryApiSecret
});

// Function to upload files on Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
    let uploadedFile;
    const compressedFilePath = `compressed_${Date.now()}.webp`;

    try {
        if (!localFilePath) throw new Error("No file path provided");

        try {
            // Try compression first
            await sharp(localFilePath)
                .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality: 80 })
                .toFile(compressedFilePath);

            uploadedFile = await cloudinary.uploader.upload(compressedFilePath, {
                resource_type: "auto",
                folder: "AMRR TechSols"
            });
        } catch (compressError) {
            // console.log("Compression failed, uploading original");
            uploadedFile = await cloudinary.uploader.upload(localFilePath, {
                resource_type: "auto",
                folder: "AMRR TechSols"
            });
        }

        // Clean up
        try {
            if (localFilePath && (await fsPromises.stat(localFilePath).catch(() => false))) {
                await fsPromises.unlink(localFilePath);
            }
            if (compressedFilePath && (await fsPromises.stat(compressedFilePath).catch(() => false))) {
                await fsPromises.unlink(compressedFilePath);
            }
        } catch (cleanupError) {
            console.error('Cleanup failed:', cleanupError.message);
        }

        if (!uploadedFile?.url) throw new Error("Upload failed");
        return uploadedFile;

    } catch (error) {
        // Final fallback cleanup
        try {
            if (localFilePath && (await fsPromises.stat(localFilePath).catch(() => false))) {
                await fsPromises.unlink(localFilePath);
            }
            if (compressedFilePath && (await fsPromises.stat(compressedFilePath).catch(() => false))) {
                await fsPromises.unlink(compressedFilePath);
            }
        } catch (cleanupError) {
            console.error('Fallback cleanup failed:', cleanupError.message);
        }
        throw error;
    }
};


export default uploadOnCloudinary;