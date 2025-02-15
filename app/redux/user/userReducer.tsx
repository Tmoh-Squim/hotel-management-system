import { User } from "@/app/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface UserResponse {
  token: string;
  user: User; 
}

export const getUser = createAsyncThunk<UserResponse, string | null>(
  "/user",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<UserResponse>(`/api/auth/user`, {
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


const initialState: UserState = { 
  user: typeof window !== "undefined" && localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state:any) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("authorization_token");
      toast.success("logged out successfully")
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getUser.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state:any, action: PayloadAction<UserResponse>) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.error = null;

        localStorage.setItem("authorization_token", action.payload.token);
      })
      .addCase(getUser.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;