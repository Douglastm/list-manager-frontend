import { getAccessToken } from '../utils/storage';

const API_URL =
  import.meta.env.VITE_API_URL;

export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const token =
    getAccessToken();

  const headers =
    new Headers(options?.headers);

  headers.set(
    'Content-Type',
    'application/json',
  );

  if (token) {
    headers.set(
      'Authorization',
      `Bearer ${token}`,
    );
  }

  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,
      headers,
    },
  );

  if (!response.ok) {
    const errorBody =
      await response
        .json()
        .catch(() => null);

    throw new Error(
      errorBody?.message ??
        'Erro ao realizar a requisição.',
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}