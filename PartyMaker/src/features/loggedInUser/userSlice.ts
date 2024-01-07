//userSlice.ts   client side
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { logInUserApi, getUserFromTokenApi, registerUserApi } from "./userAPI"
import {  User } from "../../types-env"


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}
interface UserState {
    value: User | null ,
    status: Status
}

const initialState: UserState = {
    value: null,
    status: Status.IDLE
}

export const userSlice = createSlice({
    name: "LoggedInUser",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload
        },
        logoutUser: (state) => {
            state.value = null
        }
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(logInUserApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(logInUserApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload
        })
        .addCase(logInUserApi.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(registerUserApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(registerUserApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload
        })  
        .addCase(registerUserApi.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(getUserFromTokenApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getUserFromTokenApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload
        })
        .addCase(getUserFromTokenApi.rejected, (state) => {
            state.status = Status.FAILED
        })
    }
})

export const { setUser, logoutUser } = userSlice.actions; // Export the actions

export const userSelector = (state: RootState) => state.user.value
export const userStatusSelector = (state: RootState) => state.user.status
export const userstateSelector = (state: RootState) => state.user

export default userSlice.reducer