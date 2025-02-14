import { refreshAuthToken } from "@/state/slices/userSlice";
import { store } from "@/state/store";
import { LoginResponse } from "@/types/LoginResponse.type";
import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const AUTH_PATH = "/auth";

const api = axios.create({
  // baseURL: `https://${process.env.BASE_URL}`,
  baseURL: `https://company-managemnt-system.vercel.app`,
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
    await store.dispatch(refreshAuthToken()).unwrap();
    return api.request(error.config!);
  } catch (refreshError) {
    console.log(refreshError);
    Cookies.remove(REFRESH_TOKEN);
    Cookies.remove(ACCESS_TOKEN);
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
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      return handleAuthError(error);
    }
    return Promise.reject(error);
  }
);

export const apiClient = {
  get: <T>(url: string): Promise<T> => api.get(url),
  post: <T>(url: string, data?: unknown): Promise<T> => api.post(url, data),
  put: <T>(url: string, data?: unknown): Promise<T> => api.put(url, data),
  delete: <T>(url: string): Promise<T> => api.delete(url),

  auth: {
    login: async (credentials: {
      email: string;
      password: string;
    }): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      Cookies.set(ACCESS_TOKEN, response.data.access_token, { expires: 7 });
      Cookies.set(REFRESH_TOKEN, response.data.refresh_token, {
        expires: 7,
        path: "/",
      });
      Cookies.set("is_Authenticated", "true", { expires: 7 });
      return response.data;
    },
    refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
      const response = await api.post<LoginResponse>("/auth/refresh-token", {
        refreshToken,
      });
      Cookies.set(ACCESS_TOKEN, response.data.access_token);
      Cookies.set(REFRESH_TOKEN, response.data.refresh_token, {
        expires: 7,
        path: "/",
      });
      Cookies.set("is_Authenticated", "true");
      return response.data;
    },
  },
};
