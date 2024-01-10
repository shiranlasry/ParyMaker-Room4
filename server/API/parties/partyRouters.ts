//parties router server side

import express from 'express';
import { getAllParties } from './partyConts';
const router = express.Router();


router
    .get('/get-all-parties', getAllParties)
   


export default router;