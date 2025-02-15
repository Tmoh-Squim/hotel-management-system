"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import adminUserReducer from "./admin/AdminUserReducer"
export const store = configureStore({
  reducer: {
    user:userReducer,
    users:adminUserReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;