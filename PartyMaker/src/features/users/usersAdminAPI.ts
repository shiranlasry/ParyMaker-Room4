import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types-env";

export const getAllUsersAPI = createAsyncThunk<User[] | null >('get-all-users', async () => {
    try {
        const response = await axios.get("/api/users/");
        const { ok, results } = response.data;
        
        if (!ok) {
            throw new Error("Invalid credentials getAllUsersAPI()");
        }
        return results;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})