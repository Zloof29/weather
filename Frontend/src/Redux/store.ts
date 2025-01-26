import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { initUser, logoutUser } from "./reducers";

export type AppState = {
  user: UserModel;
};

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: { initUser, logoutUser },
});

export const userAction = userSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer,
  },
});
