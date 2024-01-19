//users routes server side
 


import express from "express";
import { getAllUsers ,updatePassword,updateUser, loginUser, registerUser,getUserFromToken,deleteToken,deleteUser} from "./usersCtrl";


const router = express.Router()

router
.get("", getAllUsers)
.get("/user-from-token", getUserFromToken)
.post("/login", loginUser)
.post("/register", registerUser)
.delete("/delete-token",deleteToken )
.put("/edit-user", updateUser)
.put('/update-password', updatePassword)
.delete("/:userId", deleteUser)

;


export default router