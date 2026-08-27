"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

import css from "@/app/notes/[id]/NoteDetails.module.css"; 

export default function NotePreviewClient() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      {isLoading && <p>Loading ...</p>}
      {error && <p>Error loading note details.</p>}
      
      {note && (
        <div className={css.container}>
          <h1 className={css.title}>{note.title}</h1>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
          <span className={css.date}>
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </div>
      )}
    </Modal>
  );
}