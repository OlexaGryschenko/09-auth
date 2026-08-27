// app/notes/[id]/NoteDetails.client.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";
// import NoteTagComponent from "@/components/NoteTag/NoteTag";

export default function NoteDetailsClient() {
  const params = useParams();
  const noteId = params.id as string;

  const {
    data: note,
    isLoading,
    error
  } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading ...</p>;
  if (error || !note) return <p>Error loading note details.</p>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
      <span className={css.tag}>{note.tag}</span>
      <span className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </span>
    </div>
  );
}
