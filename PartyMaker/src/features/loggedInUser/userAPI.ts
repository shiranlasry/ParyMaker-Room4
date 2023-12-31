//users api

import { createAsyncThunk } from "@reduxjs/toolkit"
import {usersData}  from "../../utils/data";
import { User } from "../../types-env";

interface GetUserApiArgs {
    email: string;
    password: string;
  }

export const getUserApi = createAsyncThunk<User | null, GetUserApiArgs>('get-user', (arg) => {
    try {
        const loggedInUser:User | undefined = usersData.find
        (user => user.email === arg.email && user.password === arg.password )
        if (!loggedInUser) throw new Error("User not found getUserApi()")
        return loggedInUser
     
    } catch (error) {
        console.error(error) // this is temporary
        return null;
    }
})