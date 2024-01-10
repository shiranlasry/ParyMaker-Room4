import express from 'express';
import { addParty, deleteParty, getParties, getPartiesByUserId, updateParty } from './partyConts';
const router = express.Router();


router
    .get('/get-imgs', getParties)
    .get('/get-user-parties/:userId', getPartiesByUserId)  // New route to get parties by user ID
    .post("/add-img", addParty)
    .delete("/delete-img", deleteParty)
    .patch('/update-img', updateParty)


export default router;