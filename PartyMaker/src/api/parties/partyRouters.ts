import express from 'express';
import { addParty, deleteParty, getParties, updateParty } from './partyConts';
const router = express.Router();


router
    .get('/get-imgs', getParties)
    .post("/add-img", addParty)
    .delete("/delete-img", deleteParty)
    .patch('/update-img', updateParty)


export default router;