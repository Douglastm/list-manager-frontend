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
  const response = await apiFetch<LoginResponse>(
    '/api/v1/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );

  localStorage.setItem(
    'accessToken',
    response.accessToken,
  );

  return response;
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