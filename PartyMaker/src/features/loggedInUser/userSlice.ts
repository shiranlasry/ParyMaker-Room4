//userSlice.ts  
import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { getUserApi } from "./userAPI"
import { User } from "../../types-env"

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
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getUserApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload
        })
        .addCase(getUserApi.rejected, (state) => {
            state.status = Status.FAILED
        })
    }
})

export const userSelector = (state: RootState) => state.user.value
export const userStatusSelector = (state: RootState) => state.user.status
export const userstateSelector = (state: RootState) => state.user

export default userSlice.reducer