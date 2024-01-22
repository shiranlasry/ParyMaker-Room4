//partiesSlice.ts   clinet side
import { createSlice } from "@reduxjs/toolkit";
import { Category, Party } from "../../types-env";
import { RootState } from "../../app/store";
import { getAllCategories } from "./party_categoriesAPI";



enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}
interface PartiesState {
    value: Category []| null,
    status: Status
}
const initialState: PartiesState = {
    value: null,
    status: Status.IDLE
}
export const partiesCategoriesSlice = createSlice({
    name: "partyCategories",
    initialState,
    reducers: {
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllCategories.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllCategories.fulfilled, (state, action) => {
            
            state.status = Status.IDLE;
            state.value = action.payload ; // Update the type of state.value
        })
        .addCase(getAllCategories.rejected, (state) => {
            state.status = Status.FAILED
        })
       
    }
})

export const partiesCategoriesSelector = (state: RootState) => state.partyCategories.value
export const partiesCategoriesStatusSelector = (state: RootState) => state.partyCategories.status
export const partiesCategoriesStateSelector = (state: RootState) => state.partyCategories

export default partiesCategoriesSlice.reducer