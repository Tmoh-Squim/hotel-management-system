import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface RestaurantState {
  restaurants: [] | null;
  isLoading: boolean;
  error: string | null;
}

interface UserResponse {
  token: string;
  restaurants: []; 
}

export const getRestaurants = createAsyncThunk<UserResponse, string | null>(
  "/restaurants",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<UserResponse>(`/api/restaurant/restaurants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


const initialState: RestaurantState = { 
  restaurants: typeof window !== "undefined" && localStorage.getItem("restaurants")
    ? JSON.parse(localStorage.getItem("restaurants") as string)
    : null,
  isLoading: false,
  error: null,
};

const adminRestaurant = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getRestaurants.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getRestaurants.fulfilled, (state:any, action: PayloadAction<UserResponse>) => {
        state.restaurants = action.payload.restaurants;
        state.isLoading = false;
        state.error = null;

        localStorage.setItem("authorization_token", action.payload.token);
      })
      .addCase(getRestaurants.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default adminRestaurant.reducer;