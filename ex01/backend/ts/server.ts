import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./auth.js";
import photosRouter from "./photos.js";
import cookieParser from "cookie-parser";


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:8080", // frontend
  credentials: true,               //allow cookies/JWT
}));

app.use(express.json());
app.use("/auth", authRouter);
app.use("/api", photosRouter);

app.listen(3000, () => console.log("Backend running on port 3000"));
