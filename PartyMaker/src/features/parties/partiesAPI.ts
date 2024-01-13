//partiesAPI.ts clinet side

import axios from "axios";
import { Party } from "../../types-env";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getAllParties = createAsyncThunk<Party[] | null >('get-all-parties', async () => {
    try {
        const response = await axios.get("/api/parties/get-all-parties");
        const { ok, results } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserApi()");
        }
        return results;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})

export const createParty = createAsyncThunk<Party[], Party>(
    'create-party',
    async (partyData) => {
      try {
        
        const response = await axios.post("/api/parties/create-party", partyData);
        const { ok, results } = response.data;
        if (!ok) {
          throw new Error("Error creating party");
        }
        return results;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );