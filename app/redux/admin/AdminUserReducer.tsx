import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface UserState {
  users: [] | null;
  isLoading: boolean;
  error: string | null;
}

interface UserResponse {
  token: string;
  users: []; 
}

export const getUsers = createAsyncThunk<UserResponse, string | null>(
  "/users",
  async (token, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("Token is required");
    }

    try {
      const response = await axios.get<UserResponse>(`/api/users/allUsers`, {
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
  users: typeof window !== "undefined" && localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") as string)
    : null,
  isLoading: false,
  error: null,
};

const adminUserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state:any) => {
      state.users = null;
      localStorage.removeItem("users");
      localStorage.removeItem("authorization_token");
      toast.success("logged out successfully")
    },
  },
  extraReducers: (builder:any) => {
    builder
      .addCase(getUsers.pending, (state:any) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state:any, action: PayloadAction<UserResponse>) => {
        state.users = action.payload.users;
        state.isLoading = false;
        state.error = null;

      })
      .addCase(getUsers.rejected, (state:any, action:any) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default adminUserSlice.reducer;