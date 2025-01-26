import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

export function initUser(
  currentState: UserModel,
  action: PayloadAction<UserModel>
) {
  const newState: UserModel = action.payload;
  return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
  const newState: UserModel = null;
  return newState;
}
