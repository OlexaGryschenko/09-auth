// import axios from "axios";
import type { Note } from "@/types/note"; 
import { api } from './api';
import type { User } from "@/types/user";
import axios from "axios";


export interface RegisterPayload {
  email: string;
  password: string;
}

export interface AuthPayload {
  email: string;
  password: string;
}


export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface UpdateProfilePayload {
  username: string;
}

// 2. Використання Omit
export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

// 3. Патерн "Об'єкт параметрів" + дефолтні значення
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag = "",
}: FetchNotesParams = {}): Promise<Note[]> => {
  const response = await api.get<Note[]>("/notes", {
    params: {
      page,
      perPage,
      search: search || undefined, // 4. Очищення параметрів
      tag: tag && tag !== "all" ? tag : undefined,
    },
  });
  return response.data;
};

export const createNote = async (noteData: NewNote): Promise<Note> => {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

// ----------------  AUTH -------

export const register = async (payload: RegisterPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
};

export const login = async (payload: AuthPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/login', payload);
  return data;
};

/* export const logout = async () => {
  const { data } = await api.post('/auth/logout');
  return data;
}; */ 

export const logout = async () => {
  // Використовуємо axios напряму, щоб гарантовано вдарити по локальному роуту Next.js
  const { data } = await axios.post('/api/auth/logout');
  return data;
};


export const checkSession = async () => {
  const { data } = await api.get<User>('/auth/session');
  return data;
};

export const getMe = async () => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateProfilePayload): Promise<User> => {
  const { data } = await api.patch<User>('/auth/me', payload); 
  return data;
};