// apiClient.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { tokenService } from "./tokenService";
import { AUTH_CONSTANTS } from "./constants";
import { LoginResponse } from "@/types/LoginResponse.type";

export class ApiClient {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use((config) => {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.api.interceptors.response.use(
      (response) => {
        const isAuthEndpoint = ["/auth/login", "/auth/refresh-token"].includes(
          response.config.url || ""
        );
        return isAuthEndpoint ? response.data : response.data;
      },
      async (error: AxiosError) => {
        if (
          error.response?.status === 401 &&
          error.config?.url !== "/auth/login"
        ) {
          return this.handleAuthError(error);
        }
        return Promise.reject(error);
      }
    );
  }

  private async handleAuthError(error: AxiosError) {
    const refreshToken = tokenService.getRefreshToken();

    if (!refreshToken) {
      this.redirectToAuth();
      return Promise.reject(error);
    }

    try {
      const response = await this.api.post<LoginResponse>(
        "/auth/refresh-token",
        { refreshToken }
      );

      tokenService.setTokens(response.data);
      return response.data;
    } catch (refreshError) {
      tokenService.clearTokens();
      this.redirectToAuth();
      return Promise.reject(refreshError);
    }
  }

  private redirectToAuth() {
    window.location.href = AUTH_CONSTANTS.AUTH_PATH;
  }

  // API methods
  async get<T>(url: string): Promise<T> {
    return this.api.get(url);
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    return this.api.post(url, data);
  }

  async put<T>(url: string, data?: unknown): Promise<T> {
    return this.api.put(url, data);
  }

  async patch<T>(url: string, data?: unknown): Promise<T> {
    return this.api.patch(url, data);
  }

  async delete<T>(url: string): Promise<T> {
    return this.api.delete(url);
  }
}
