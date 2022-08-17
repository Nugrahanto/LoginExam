import express from "express";
import dotenv from "dotenv";
import FileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
dotenv.config();

const app = express();

// app.use(cors());
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);

app.listen(5000, ()=> console.log('Server Up and Running...'));