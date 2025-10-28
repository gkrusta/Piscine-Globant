import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./auth.js";
import photosRouter from "./photos.js";

dotenv.config();
const app = express();
app.use(cors()); // allowing all routes
app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", photosRouter);

app.listen(3000, () => console.log("Backend running on port 3000"));
