//parties router server side

import express from 'express';
import { getAllParties ,getAllCategories,createNewParty,saveImgtoDB,getPartiesByUserId, getPartyById, deleteParty,updateParty} from './partyConts';
const router = express.Router();


router
    .get('/get-all-parties', getAllParties)
    .get('/get-all-parties-categories', getAllCategories)
    .post('/create-party', createNewParty)
    .post('/save-img-to-db',saveImgtoDB )
    .get('/get-party-by-id/:party_id', getPartyById)
    .get('/parties-by-user-id/:user_id', getPartiesByUserId)
    .delete("/:PartyId", deleteParty)
    .put("/:PartyId", updateParty)
    
   


export default router;