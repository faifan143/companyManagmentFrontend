/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginResponse } from "@/types/LoginResponse.type";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
const AUTH_PATH = "/auth";
const COOKIE_EXPIRES = 7;
export const IS_AUTHENTICATED = "is_Authenticated";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const handleAuthError = async (error: AxiosError) => {
  const refreshToken = Cookies.get(REFRESH_TOKEN);

  if (!refreshToken) {
    window.location.href = AUTH_PATH;
    return Promise.reject(error);
  }

  try {
    const response = await api.post<LoginResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/refresh-token`,
      { refreshToken },
      { withCredentials: true }
    );

    // Save new tokens to cookies
    Cookies.set(ACCESS_TOKEN, response.data.access_token);
    Cookies.set(REFRESH_TOKEN, response.data.refresh_token, {
      expires: 7, // Persist for 7 days
      path: "/", // Ensure the cookie is available site-wide
    });
    Cookies.set(IS_AUTHENTICATED, "true");
    console.log("token refreshed successfully : ", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Authentication error:", error);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(IS_AUTHENTICATED);
    window.location.href = AUTH_PATH;
    return Promise.reject(error);
  }
};

api.interceptors.request.use((config) => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) =>
    response.config.url == "/auth/login" ||
    response.config.url == "/auth/refresh-token"
      ? response
      : response.data,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && error.config?.url != "/auth/login") {
      return await handleAuthError(error);
    }
    authAPI.logout();
    return Promise.reject(error);
  }
);

// Cookie management
const setAuthCookies = (data: LoginResponse) => {
  console.log("set auth cookies data : ", data);

  Cookies.set(ACCESS_TOKEN, data.access_token, { expires: COOKIE_EXPIRES });
  Cookies.set(REFRESH_TOKEN, data.refresh_token, {
    expires: COOKIE_EXPIRES,
    path: "/",
  });
  Cookies.set(IS_AUTHENTICATED, "true", { expires: COOKIE_EXPIRES });
};

const clearAuthCookies = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
  Cookies.remove(IS_AUTHENTICATED);
};

// Authentication API
export const authAPI = {
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      setAuthCookies(response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  },

  refreshToken: async (): Promise<LoginResponse> => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    try {
      const response = await api.post<any, AxiosResponse<LoginResponse>>(
        "/auth/refresh-token",
        {
          refreshToken,
        }
      );
      setAuthCookies(response.data);
      return response.data;
    } catch (error: any) {
      clearAuthCookies();
      throw new Error(
        error.response?.data?.message || "Failed to refresh token"
      );
    }
  },

  logout: () => {
    clearAuthCookies();
  },
};

export const apiClient = {
  get: <T>(url: string): Promise<T> => api.get(url),
  post: <T>(url: string, data?: unknown): Promise<T> => api.post(url, data),
  put: <T>(url: string, data?: unknown): Promise<T> => api.put(url, data),
  patch: <T>(url: string, data?: unknown): Promise<T> => api.patch(url, data),
  delete: <T>(url: string): Promise<T> => api.delete(url),
};
