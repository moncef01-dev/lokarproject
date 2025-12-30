export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message?: string;
  user_id: string; // or number depending on backend
  accessToken?: string;
}
