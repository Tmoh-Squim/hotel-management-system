"use client";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userReducer";
import adminUserReducer from "./admin/AdminUserReducer";
import adminRestaurantReducer from "./admin/AdminRestaurantReducer";
import adminBookingReducer from "./admin/AdminBookings";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  users: adminUserReducer,
  restaurants: adminRestaurantReducer,
  bookings:adminBookingReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serializability warning
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;