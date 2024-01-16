//partiesSlice.ts   clinet side
import { createSlice } from "@reduxjs/toolkit";
import { Party } from "../../types-env";
import { RootState } from "../../app/store";
import { createParty, getAllParties ,saveImgtoDB} from "./partiesAPI";


enum Status {
    IDLE = "idle",
    LOADING = "loading",
    FAILED = "failed"
}
interface PartiesState {
    value: Party []| null,
    img_id: number | null,
    status: Status
}
const initialState: PartiesState = {
    value: null,
    img_id: 1111111123,
    status: Status.IDLE
}
export const partiesSlice = createSlice({
    name: "Parties",
    initialState,
    reducers: {
   
    },
    extraReducers: (builder) => {
        builder
        .addCase(getAllParties.pending, (state) => {
            state.status = Status.LOADING
        })
        .addCase(getAllParties.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            state.value = action.payload ; // Update the type of state.value
        })
        .addCase(getAllParties.rejected, (state) => {
            state.status = Status.FAILED
        })
        .addCase(createParty.pending, (state) => {
            state.status = Status.LOADING;
          })
          .addCase(createParty.fulfilled, (state, action) => {
            state.status = Status.IDLE;
            // Assuming createParty will return the updated list of parties
            state.value = action.payload;
          })
          .addCase(createParty.rejected, (state) => {
            state.status = Status.FAILED;
          })
          .addCase(saveImgtoDB.pending, (state) => {
            state.status = Status.LOADING;
          })
          .addCase(saveImgtoDB.fulfilled, (state, action) => {
                state.status = Status.IDLE; 
                state.img_id = action.payload.img_id;
            })  
          .addCase(saveImgtoDB.rejected, (state) => {
                state.status = Status.FAILED;
            });
    }
})

export const partiesSelector = (state: RootState) => state.parties.value
export const partiesImgIdSelector = (state: RootState) => state.parties.img_id
export const partiesStatusSelector = (state: RootState) => state.parties.status
export const partiesStateSelector = (state: RootState) => state.parties

export default partiesSlice.reducer