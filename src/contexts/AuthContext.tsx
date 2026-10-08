import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  getCurrentUser,
  login as loginService,
  updateCurrentUser,
} from '../services/authService';

import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from '../utils/storage';

import type {
  AuthUser,
  LoginRequest,
} from '../types/auth';

import type { UpdateUserRequest } from '../services/authService';

interface AuthContextData {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;

  login: (
    data: LoginRequest,
  ) => Promise<void>;

  updateUser: (
    data: UpdateUserRequest,
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
  const [user, setUser] =
    useState<AuthUser | null>(null);

  const [token, setToken] =
    useState<string | null>(
      getAccessToken(),
    );

  const [loading, setLoading] =
    useState(true);

  const isAuthenticated =
    Boolean(token && user);

  useEffect(() => {
    async function loadUser() {
      const storedToken =
        getAccessToken();

      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        setToken(storedToken);
        setUser(currentUser);
      } catch {
        removeAccessToken();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(
    data: LoginRequest,
  ): Promise<void> {
    const response =
      await loginService(data);

    setAccessToken(
      response.accessToken,
    );

    setToken(
      response.accessToken,
    );

    const currentUser =
      await getCurrentUser();

    setUser(currentUser);
  }

  async function updateUser(
    data: UpdateUserRequest,
  ): Promise<void> {
    const updatedUser =
      await updateCurrentUser(data);

    setUser(updatedUser);
  }

  function logout(): void {
    removeAccessToken();

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}