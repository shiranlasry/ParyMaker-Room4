//partiesAPI.ts clinet side

import axios from "axios";
import { Party } from "../../types-env";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPartyById = createAsyncThunk<Party | null, number>(
  'get-party-by-id',
  async (partyId) => {
    try {
      const response = await axios.get(`/api/parties/get-party-by-id/${partyId}`);
       
      const { ok, result } = response.data;
      if (!ok) {
        throw new Error("Error getting party by ID");
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);
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
export const createParty = createAsyncThunk<Party, Party>(
    'create-party',
    async (partyData) => {
      try {
          
        const response = await axios.post("/api/parties/create-party", partyData);
        const { ok, incomingParty } = response.data;
        if (!ok) {
          throw new Error("Error creating party");
        }
        return incomingParty;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
  export const saveImgtoDB = createAsyncThunk<{ ok: boolean; img_id: number }, FormData>(
    'save-img-to-db',
    async (file) => {
      try {
        const response = await axios.post("/api/parties/save-img-to-db", file);
        console.log(response)
        
        const { ok, img_id } = response.data;
  
        if (!ok) {
          throw new Error("Error creating party");
        }
        
        return { ok, img_id };
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
  export const partiesByUserId = createAsyncThunk<Party[] | null, number|null>(
    'parties-by-user-id',
    async (userId) => {
      try {
        const response = await axios.get(`/api/parties/parties-by-user-id/${userId}`);
        const { ok, results } = response.data;
        if (!ok) {
          throw new Error("Invalid credentials getUserApi()");
        }
        return results;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  interface deletePartyArg {
    partyId: number;
    role: string;
  }
  export const deletePartyAPI = createAsyncThunk<Party[] | null, deletePartyArg>(
    'delete-party',
    async (args) => {
      try {
        debugger;
        const response = await axios.delete(`/api/parties/delete`, { data: args });
        const { ok, results } = response.data;
        if (!ok) {
          throw new Error("Invalid credentials getUserApi()");
        }
        return results;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  

  export const updatePartyAPI = createAsyncThunk<Party[] | null, Party>(
    'update-party',
    async (party) => {
      try {
        debugger
        const response = await axios.put(`/api/parties/${party.party_id}`, party);
        const { ok, results } = response.data;
        if (!ok) {
          throw new Error("Error updating party");
        }
        return results;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  
