/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface Department {
  id: string;
  name: string;
  description: string;
  parent_department_id?: Department | null;
}

interface Job {
  title: string;
  grade_level: string;
  description: string;
  department: Department;
  permissions: string[];
  responsibilities: string[];
}

interface User {
  _id: string;
  name: string;
  email: string;
  address: string;
  dob: string;
  phone: string;
  job: Job;
  token: string;
}

interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const loginUser = createAsyncThunk<
  User,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `http://${process.env.BASE_URL}/auth/login`,
      userData,
      {
        withCredentials: true,
      }
    );

    Cookies.set("access_token", response.data.access_token);
    Cookies.set("refresh_token", response.data.refresh_token);

    return response.data.user;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Failed to login");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
