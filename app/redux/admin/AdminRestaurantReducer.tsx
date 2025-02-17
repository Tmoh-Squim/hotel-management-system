import { Product } from "@/app/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface RestaurantState {
  restaurants: Product[] | null;
  isLoading: boolean;
  error: string | null;
}



export const getRestaurants = createAsyncThunk<RestaurantState, string | null>(
  "/restaurants",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<RestaurantState>(`/api/restaurant/restaurants`, {
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
      .addCase(getRestaurants.fulfilled, (state:any, action: PayloadAction<RestaurantState>) => {
        state.restaurants = action.payload.restaurants;
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getRestaurants.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default adminRestaurant.reducer;