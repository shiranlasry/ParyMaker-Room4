//parties router server side

import express from 'express';
import { getAllParties ,getAllCategories,createNewParty} from './partyConts';
const router = express.Router();


router
    .get('/get-all-parties', getAllParties)
    .get('/get-all-parties-categories', getAllCategories)
    .post('/create-party', createNewParty)
   


export default router;