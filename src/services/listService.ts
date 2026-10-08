import { apiFetch } from './api';

import type { List } from '../types/list';

export interface CreateListRequest {
  name: string;
  description: string;
}

export async function getLists(): Promise<List[]> {
  return apiFetch<List[]>(
    '/api/v1/lists',
    {
      method: 'GET',
    },
  );
}

export async function createList(
  data: CreateListRequest,
): Promise<List> {
  return apiFetch<List>(
    '/api/v1/lists',
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
}