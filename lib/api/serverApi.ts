import { cookies } from 'next/headers';
import { api } from './api';
import type { Note } from '@/types/note';
import type { User } from '@/types/user';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
};

export const fetchNotes = async (
  params: FetchNotesParams = {}
): Promise<Note[]> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note[]>('/notes', {
    headers,
    params: {
      page: params.page ?? 1,
      perPage: params.perPage ?? 12,
      search: params.search || undefined,
      tag: params.tag && params.tag !== 'all' ? params.tag : undefined,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, { headers });
  return data;
};

export const getMe = async (): Promise<User> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>('/users/me', { headers });
  return data;
};

export const checkSession = async (): Promise<User | null> => {
  const headers = await getAuthHeaders();
  const { data } = await api.get<User>('/auth/session', { headers });
  return data;
};