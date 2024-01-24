import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../config/baseUrl";
import { Category } from "../../types-env";

export const getAllCategories = createAsyncThunk<Category[] | null>('get-all-parties-categories', async () => {
    try {
        const response = await axios.get(`/${base_url}/api/parties/get-all-parties-categories`);
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