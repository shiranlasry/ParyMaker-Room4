//users routes server side
//usersRoutes.ts   server side  


import express from "express";
import { getAllUsers, loginUser, registerUser,getUserFromToken } from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)
.get("/user-from-token", getUserFromToken)
.post("/login", loginUser)
.post("/register", registerUser)
;


export default router