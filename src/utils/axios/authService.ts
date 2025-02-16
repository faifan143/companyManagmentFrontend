// authService.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
import { LoginResponse } from "@/types/LoginResponse.type";
import { ApiClient } from "./apiClient";
import { tokenService } from "./tokenService";

interface LoginCredentials {
  email: string;
  password: string;
}

export class AuthService {
  constructor(private apiClient: ApiClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await this.apiClient.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      tokenService.setTokens(response);
      return response;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = tokenService.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    try {
      const response = await this.apiClient.post<LoginResponse>(
        "/auth/refresh-token",
        {
          refreshToken,
        }
      );
      tokenService.setTokens(response);
      return response;
    } catch (error) {
      tokenService.clearTokens();
      throw new Error("Failed to refresh token");
    }
  }

  logout(): void {
    tokenService.clearTokens();
  }
}
