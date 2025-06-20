import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import { DB_NAME } from "./constants.js";
import { app } from "./app.js";
import envconf from "./config/envconf.js";


// Making Database Connection using IIFE function:
(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(`${envconf.mongodbUri}/${DB_NAME}`);

    console.log(`Database URL: ${envconf.mongodbUri}/${DB_NAME}`);

    // Start listening on the port only after successful DB connection
    app.listen(envconf.port, () => {
      console.log(`App is listening at port: ${envconf.port}`);
    });

  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
})();