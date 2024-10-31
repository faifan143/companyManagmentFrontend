/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginResponse, UserType } from "@/types/LoginResponse.type";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

interface UserState {
  userInfo: UserType | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  token: string | null;
  refresh_token: string | null;
  role: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  token: null,
  refresh_token: null,
  role: null,
};

export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string }
>("user/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<LoginResponse>(
      `http://${process.env.BASE_URL}/auth/login`,
      userData,
      {
        withCredentials: true,
      }
    );
    Cookies.set("access_token", response.data.access_token);
    Cookies.set("refresh_token", response.data.refresh_token);
    Cookies.set("is_Authenticated", "true");
    console.log("logged in successfully : ", response.data);
    return response.data;
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
      state.token = null;
      state.refresh_token = null;
      state.error = null;
      state.role = null;
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.token = null;
        state.refresh_token = null;
        state.role = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.userInfo = {
            ...action.payload.user,
          };
          state.isAuthenticated = true;
          state.token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          state.role = action.payload.role;
        }
      )

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
