//users routes server side
 


import express from "express";
import { getAllUsers,
     updatePassword,
     updateUser,
     loginUser,
     updateUserRole,
      registerUser,getUserFromToken,deleteToken,deleteUser,getUsersByPartyID} from "./usersCtrl";


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
.get("/get-users-by-party-id/:party_id", getUsersByPartyID)
.put("/update-user-role", updateUserRole)
;


export default router