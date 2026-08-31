"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createNote, type NewNote } from '@/lib/api/clientApi';
import { type NoteTag } from "@/types/note"
import css from "./NoteForm.module.css";

import { useNoteDraftStore } from '@/lib/store/noteStore'


export default function NoteForm() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const mutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft(); 
      router.push("/notes/filter/all");
    },
  });

  const handleCancel = () => {
    clearDraft();
    router.push("/notes/filter/all");
  };

  const handleSubmit = (formData: FormData) => {
    const newNote: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    mutation.mutate(newNote);
  }; 

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
          rows={8}
          maxLength={500}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag"
        name="tag" required 
        defaultValue={draft.tag}
        onChange={(e) => setDraft({ tag: e.target.value as NoteTag })}

        className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button 
          type="button" 
          className={css.cancelButton} 
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>

  );
};
