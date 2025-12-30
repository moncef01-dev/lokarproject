import api from "./api";
import type {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
} from "../types/auth"; // I'll create this type file next

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/auth/signup", credentials);
    return response.data;
  },

  async logout() {
    // If backend has logout endpoint, call it. Otherwise just clear local state if any.
    // Assuming cookie clear happens on backend or ignored.
    // For now we might not have a logout endpoint, so we just handle client side.
  },
};
