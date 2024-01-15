import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { saveImgtoDB } from './API/parties/partyConts'; 
const multer = require('multer');

const storage = multer.memoryStorage(); // Use memory storage for handling files in memory
const upload = multer({ storage: storage });
dotenv.config();

const app = express();

const port = process.env.PORT;
app.use(cookieParser());
app.use(express.json());

// Multer middleware for handling file uploads
app.use(upload.single('file'));

import userRoutes from "./API/users/usersRoutes"
app.use("/api/users", userRoutes)

import partyRoutes from "./API/parties/partyRouters"
app.use("/api/parties", partyRoutes)

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
