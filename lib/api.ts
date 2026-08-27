import axios from "axios";
import type { Note } from "@/types/note"; 

const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

// 1. Рання перевірка токена
if (!NOTEHUB_TOKEN) {
  throw new Error("NoteHub token is missing");
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

// 2. Використання Omit
export type NewNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

// 3. Патерн "Об'єкт параметрів" + дефолтні значення
export const fetchNotes = async ({
  page = 1,
  perPage = 12,
  search = "",
  tag = "",
}: FetchNotesParams = {}): Promise<NotesResponse> => {
  const response = await api.get<NotesResponse>("/notes", {
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