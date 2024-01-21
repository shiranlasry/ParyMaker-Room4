import { createSlice } from "@reduxjs/toolkit"
import { User } from "../../types-env"
import { RootState } from "../../app/store"
import { getAllUsersAPI } from "./usersAdminAPI"

enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}
interface UsersState {
    value: User []| null ,
    status: Status
   
}

const initialState: UsersState = {
    value: null,
    status: Status.IDLE
}
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.value = action.payload
        },
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllUsersAPI.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllUsersAPI.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload
        })
        .addCase(getAllUsersAPI.rejected, (state) => {
            state.status = Status.FAILED
        })
        
    }
})


export const { setUsers } = usersSlice.actions; // Export the actions
export const usersSelector = (state: RootState) => state.users.value; // Export the selector


export default usersSlice.reducer