import { Booking } from "@/app/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserBookingsState {
  userBookings: Booking[] | null;
  isLoading: boolean;
  error: string | null;
}



export const getUserBookings = createAsyncThunk<UserBookingsState, string | null>(
  "/userBookings",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<UserBookingsState>(`/api/restaurant/getUserBookings`, {
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


const initialState: UserBookingsState = { 
  userBookings: typeof window !== "undefined" && localStorage.getItem("userBookings")
    ? JSON.parse(localStorage.getItem("userBookings") as string)
    : null,
  isLoading: false,
  error: null,
};

const adminRestaurant = createSlice({
  name: "userBookings",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getUserBookings.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getUserBookings.fulfilled, (state:any, action: PayloadAction<UserBookingsState>) => {
        state.userBookings = action.payload.userBookings;
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getUserBookings.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default adminRestaurant.reducer;