import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { User } from "../../types-env";
import { getAllUsersAPI, getUsersByPartyIdAPI } from "./usersAPI";

enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
}

interface UsersState {
  value: User[] | null;
  usersByPartyId: User[] | null;
  status: Status;
}

const initialState: UsersState = {
  value: null,
  usersByPartyId: null,
  status: Status.IDLE,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[] | null>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getAllUsersAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.value = action.payload;
      })
      .addCase(getAllUsersAPI.rejected, (state) => {
        state.status = Status.FAILED;
      })
      .addCase(getUsersByPartyIdAPI.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(getUsersByPartyIdAPI.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.usersByPartyId = action.payload;
      })
      .addCase(getUsersByPartyIdAPI.rejected, (state) => {
        state.status = Status.FAILED;
      });
  },
});

export const { setUsers } = usersSlice.actions;
export const usersSelector = (state: RootState) => state.users.value;
export const usersByPartyIdSelector = (state: RootState) => state.users.usersByPartyId;

export default usersSlice.reducer;
