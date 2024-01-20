//partiesSlice.ts   clinet side
import { createSlice } from "@reduxjs/toolkit";
import { Party } from "../../types-env";
import { RootState } from "../../app/store";
import {
  createParty,
  partiesByUserId,
  getAllParties,
  saveImgtoDB,
  getPartyById,
  deletePartyAPI,
  updatePartyAPI,
  isUserjoinedPartyAPI,
  addPartyPartcipantsAPI,
  deletePartyPartcipantsAPI,
} from "./partiesAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}
interface PartiesState {
  value: Party[] | null;
  valueByUserId: Party[] | null;
  isUserjoinedParty: boolean;
  img_id: number | null;
  incomingParty: Party | null;
  status: Status;
}
const initialState: PartiesState = {
  value: null,
  valueByUserId: null,
  isUserjoinedParty: false,
  img_id: null,
  incomingParty: null,
  status: Status.IDLE,
};
export const partiesSlice = createSlice({
  name: "Parties",
  initialState,
  reducers: {
    resetIsUserjoinedParty: (state) => {
     
      state.isUserjoinedParty = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllParties.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAllParties.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload; // Update the type of state.value
      })
      .addCase(getAllParties.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(createParty.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(createParty.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        // Assuming createParty will return the updated list of parties
        state.incomingParty = action.payload;
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
      })
      .addCase(getPartyById.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getPartyById.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.incomingParty = action.payload;
      })
      .addCase(getPartyById.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(partiesByUserId.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(partiesByUserId.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.valueByUserId = action.payload;
      })
      .addCase(partiesByUserId.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(deletePartyAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deletePartyAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(deletePartyAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(updatePartyAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(updatePartyAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(isUserjoinedPartyAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(isUserjoinedPartyAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(isUserjoinedPartyAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.isUserjoinedParty = action.payload;
      })
      .addCase(addPartyPartcipantsAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(addPartyPartcipantsAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(addPartyPartcipantsAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.isUserjoinedParty = action.payload;
      })
      .addCase(deletePartyPartcipantsAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(deletePartyPartcipantsAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(deletePartyPartcipantsAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.isUserjoinedParty = false;
      });
      
      

  },
});
export const  {resetIsUserjoinedParty } = partiesSlice.actions;
export const partiesSelector = (state: RootState) => state.parties.value;
export const partiesImgIdSelector = (state: RootState) => state.parties.img_id;
export const incomingPartySelector = (state: RootState) =>
  state.parties.incomingParty;
export const partiesStatusSelector = (state: RootState) => state.parties.status;
export const partiesStateSelector = (state: RootState) => state.parties;
export const partiesByUserIdSelector = (state: RootState) =>
  state.parties.valueByUserId;
export const isUserjoinedPartySelector = (state: RootState) => state.parties.isUserjoinedParty;
  

export default partiesSlice.reducer;
