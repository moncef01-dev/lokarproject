import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkAuth = async () => {
    try {
      const response = await api.get("/user/me");
      setIsAuthenticated(true);
      setUser(response.data);
    } catch {
      console.log("Not authenticated");
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    // Since we use httpOnly cookies, we just refresh auth state from the server.
    await checkAuth();
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Ideally call backend logout here to clear cookies
    // await api.post('/auth/logout');
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
