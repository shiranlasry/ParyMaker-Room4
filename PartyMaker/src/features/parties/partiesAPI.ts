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
        debugger  
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
  export const saveImgtoDB = createAsyncThunk<number, FormData>(
    'save-img-to-db',
    async (imgData) => {
      try {
        const response = await axios.post("/api/parties/save-img-to-db", imgData);
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