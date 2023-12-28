import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/loggedInUser/userSlice"
import partiesReducer from "../features/parties/partiesSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    parties : partiesReducer  
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
