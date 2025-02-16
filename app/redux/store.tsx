"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import adminUserReducer from "./admin/AdminUserReducer";
import adminRestaurantReducer from "./admin/AdminRestaurantReducer";
export const store = configureStore({
  reducer: {
    user:userReducer,
    users:adminUserReducer,
    restaurants:adminRestaurantReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;