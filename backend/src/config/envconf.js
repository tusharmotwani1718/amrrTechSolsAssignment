import dotenv from 'dotenv';
dotenv.config();


const envconf = {
    mongodbUri: process.env.MONGODB_URI,
    port: process.env.PORT,
    mongodbUsername: process.env.MONGODB_ATLAS_USERNAME,
    mongodbPassword: process.env.MONGODB_ATLAS_PASSWORD,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    corsOrigin: process.env.CORS_ORIGIN || '*'
};

export default envconf;