import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../config/baseUrl";
import { User } from "../../types-env";

export const getAllUsersAPI = createAsyncThunk<User[] | null>(
  "get-all-users",
  async () => {
    try {
      const response = await axios.get(`${base_url}/api/users`);
      const { ok, results } = response.data;

      if (!ok) {
        throw new Error("Invalid credentials getAllUsersAPI()");
      }
      return results;
    } catch (error) {
      console.error(error); // Log the error, but do not throw it
      return null;
    }
  }
);

export const getUsersByPartyIdAPI = createAsyncThunk<User[] | null, number>(
  "get-users-by-party-id",
  async (party_id) => {
    try {
      const response = await axios.get(`${base_url}/api/users/get-users-by-party-id/${party_id}`);
      const { ok, results } = response.data;

      if (!ok) {
        throw new Error("Invalid credentials getUsersByPartyIdAPI()");
      }
      return results;
    } catch (error) {
      console.error(error); // Log the error, but do not throw it
      return null;
    }
  }
);


