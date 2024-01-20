//parties router server side

import express from 'express';
import { getAllParties,getPartiesByUserId,addPartyParticipants,deletePartyParticipants ,getAllCategories,createNewParty,saveImgtoDB, getPartyById, deleteParty,updateParty,IsPartyParticipants} from './partyConts';
const router = express.Router();


router
    .get('/get-all-parties', getAllParties)
    .get('/get-all-parties-categories', getAllCategories)
    .post('/create-party', createNewParty)
    .post('/save-img-to-db',saveImgtoDB )
    .get('/get-party-by-id/:party_id', getPartyById)
    .get('/parties-by-user-id/:user_id', getPartiesByUserId)
    .delete("/delete", deleteParty)
    .put("/:party_id", updateParty)
    .post("/add-party-participants",addPartyParticipants)
    .post("/is-user-joined-party",IsPartyParticipants)
    .delete("/delete-party-participants",deletePartyParticipants)
    
   


export default router;