//users routes server side

import express from "express";
import { getAllUsers, loginUser } from "./usersCtrl";

const router = express.Router()

router.get("", getAllUsers);
router.post("/login", loginUser);

export default router