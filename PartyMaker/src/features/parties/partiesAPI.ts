import axios from "axios";
import { Party } from "../../types-env";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { partiesData } from "../../utils/data";


export const getHotPartiesApi = createAsyncThunk<Party[] |null>('get-hot-parties', async () => {
    try {
        const parties : Party[] = partiesData;
        return parties;
    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
}
)