import { configureStore, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

export type AppState = {
  user: UserModel;
};

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {},
});

export const userAction = userSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    user: userSlice.reducer,
  },
});
