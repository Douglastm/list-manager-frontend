import { apiFetch } from './api';

import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../types/auth';

export async function login(
  data: LoginRequest,
): Promise<LoginResponse> {
  return apiFetch<LoginResponse>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function register(
  data: RegisterRequest,
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>(
    '/api/v1/users',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}

export async function getCurrentUser(): Promise<AuthUser> {
  return apiFetch<AuthUser>(
    '/api/v1/users/me',
    {
      method: 'GET',
    },
  );
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function updateCurrentUser(
  data: UpdateUserRequest,
): Promise<AuthUser> {
  return apiFetch<AuthUser>(
    '/api/v1/users/me',
    {
      method: 'PUT',
      body: JSON.stringify(data),
    },
  );
}