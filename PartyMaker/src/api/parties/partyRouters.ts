import express from "express";
import {
  getPartyById,
  addParty,
  deleteParty,
  getParties,
  getPartiesByUserId,
  updateParty,
} from "./partyConts";
const router = express.Router();

router
  .get("/get-imgs", getParties)
  .get("/get-user-parties/:userId", getPartiesByUserId)
  .get("/get-party/:partyId", getPartyById)
  .post("/add-img", addParty)
  .delete("/delete-img", deleteParty)
  .patch("/update-img", updateParty);

export default router;
