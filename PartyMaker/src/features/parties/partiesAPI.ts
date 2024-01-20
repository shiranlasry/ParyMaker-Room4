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
        debugger
        const response = await axios.get(`/api/parties/parties-by-user-id/${userId}`);
        debugger
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
  interface AddPartyPartcipants {
    party_id: number;
    user_id: number;
  }
  export const addPartyPartcipantsAPI = createAsyncThunk<boolean, AddPartyPartcipants>(
    'add-party-participants',
    async (args) => {
      try {
        const response = await axios.post(`/api/parties/add-party-participants`, args);
        const { ok ,error} = response.data;
        
        if (!ok) {
          alert(error);
          throw new Error(error);
        }
        alert("Party Participants Added");
        return ok;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  export const isUserjoinedPartyAPI = createAsyncThunk<boolean, AddPartyPartcipants>(
    'is-user-joined-party',
    async (args) => {
      try {
        
        const response = await axios.post(`/api/parties/is-user-joined-party`, args);
        const { ok ,results} = response.data;
        console.log(`isUserjoinedPartyAPI ${results} ${ok}`)
        return ok;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  export const deletePartyPartcipantsAPI = createAsyncThunk<boolean, AddPartyPartcipants>(
    'delete-party-participants',
    async (args) => {
      try {
        const response = await axios.delete(`/api/parties/delete-party-participants`, { data: args });
        const { ok } = response.data;
        if (!ok) {
          throw new Error("Invalid credentials getUserApi()");
        }
        return ok;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  );
  
  
