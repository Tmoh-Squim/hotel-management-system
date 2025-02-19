import { Booking } from "@/app/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface BookingsState {
  bookings: Booking[] | null;
  isLoading: boolean;
  error: string | null;
}



export const getBookings = createAsyncThunk<BookingsState, string | null>(
  "/bookings",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<BookingsState>(`/api/admin/bookings`, {
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


const initialState: BookingsState = { 
  bookings: typeof window !== "undefined" && localStorage.getItem("bookings")
    ? JSON.parse(localStorage.getItem("bookings") as string)
    : null,
  isLoading: false,
  error: null,
};

const adminRestaurant = createSlice({
  name: "bookings",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getBookings.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getBookings.fulfilled, (state:any, action: PayloadAction<BookingsState>) => {
        state.bookings = action.payload.bookings;
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getBookings.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default adminRestaurant.reducer;