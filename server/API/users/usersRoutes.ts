//users routes server side
//usersRoutes.ts   server side  


import express from "express";
import { getAllUsers, loginUser, registerUser } from "./usersCtrl";
import { register } from "module";

const router = express.Router()

router
.get("", getAllUsers)
.post("/login", loginUser)
.post("/register", registerUser);


export default router