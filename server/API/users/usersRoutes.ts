//users routes server side
//usersRoutes.ts   server side  


import express from "express";
import { getAllUsers,updateUser, loginUser, registerUser,getUserFromToken,deleteToken } from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)
.get("/user-from-token", getUserFromToken)
.post("/login", loginUser)
.post("/register", registerUser)
.delete("/delete-token",deleteToken )
.put("/edit-user", updateUser)
;


export default router