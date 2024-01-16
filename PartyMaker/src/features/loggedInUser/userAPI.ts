//users api client side

import { createAsyncThunk } from "@reduxjs/toolkit"
import { User } from "../../types-env";
import axios from "axios";

interface GetUserApiArgs {
    email: string;
    password: string;
}

export const logInUserApi = createAsyncThunk<User | null, GetUserApiArgs>('get-user', async (arg) => {
    try {
        const response = await axios.post("/api/users/login", arg);
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserApi()");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})

export const registerUserApi = createAsyncThunk<User | null,User>('register-user', async (arg) => {
    try {
        const response = await axios.post("/api/users/register", arg);

        const { ok, user } = response.data;

        if (!ok) {
            throw new Error("Invalid credentials registerUserApi()");
        }

        return user;

    } catch (error) {
        console.error(error); // this is temporary
        return null;
    }
});

export const getUserFromTokenApi = createAsyncThunk<User | null>('get-user-from-token', async () => {
    try {

        const response = await axios.get("/api/users/user-from-token");
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials getUserFromTokenApi()");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})

export const deleteTokenApi = createAsyncThunk('delete-token', async () => {
    try {
        const response = await axios.delete("/api/users/delete-token");
        const { ok } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials deleteTokenApi()");
        }
        return null;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
export const editUserApi = createAsyncThunk<User | null, User>('edit-user', async (arg) => {
    try {
        const response = await axios.put("/api/users/edit-user", arg);
        debugger
        const { ok, user } = response.data;
        if (!ok) {
            throw new Error("Invalid credentials editUserApi()");
        }
        return user;

    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})
