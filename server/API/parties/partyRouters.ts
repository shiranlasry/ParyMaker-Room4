//parties router server side

import express from 'express';
import { getAllParties ,getAllCategories,createNewParty,saveImgtoDB} from './partyConts';
const router = express.Router();


router
    .get('/get-all-parties', getAllParties)
    .get('/get-all-parties-categories', getAllCategories)
    .post('/create-party', createNewParty)
    .post('/save-img-to-db',saveImgtoDB )
   


export default router;