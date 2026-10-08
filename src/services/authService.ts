import { apiFetch } from './api';

import type {
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