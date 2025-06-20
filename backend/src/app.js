import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import envconf from "./config/envconf.js";


const app = express();

// MIDDLEWARES:
app.use(cors({
    origin: envconf.corsOrigin,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// import routes:
import itemRoutes from "./routes/item.routes.js";
app.use("/api/v1/items", itemRoutes);

export { app };
