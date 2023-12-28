import { createSlice } from "@reduxjs/toolkit";
import { Party } from "../../types-env";
import { RootState } from "../../app/store";
import { getHotPartiesApi } from "./partiesAPI";


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}
interface PartiesState {
    value: Party []| null ,
    status: Status
}
const initialState: PartiesState = {
    value: null,
    status: Status.IDLE
}
export const partiesSlice = createSlice({
    name: "Parties",
    initialState,
    reducers: {
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getHotPartiesApi.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getHotPartiesApi.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload ; // Update the type of state.value
        })
        .addCase(getHotPartiesApi.rejected, (state) => {
            state.status = Status.FAILED
        })
    }
})

export const partiesSelector = (state: RootState) => state.parties.value
export const partiesStatusSelector = (state: RootState) => state.parties.status
export const partiesStateSelector = (state: RootState) => state.parties

export default partiesSlice.reducer