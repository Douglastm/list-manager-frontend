import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { login as loginService } from '../services/authService';

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/storage';

import type {
  LoginRequest,
  LoginResponse,
} from '../types/auth';

interface AuthContextData {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    data: LoginRequest,
  ) => Promise<void>;

  logout: () => void;
}

export const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined,
  );

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    getAccessToken(),
  );

  const [loading, setLoading] = useState(true);

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const storedToken = getAccessToken();

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  async function login(
    data: LoginRequest,
  ): Promise<void> {
    const response: LoginResponse =
      await loginService(data);

    setAccessToken(response.accessToken);

    setToken(response.accessToken);
  }

  function logout(): void {
    removeAccessToken();

    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}