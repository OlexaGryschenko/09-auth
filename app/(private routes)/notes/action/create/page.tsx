import { Metadata } from "next";
import NoteForm  from "@/components/NoteForm/NoteForm"
import  css from "@/components/NoteForm/NoteForm.module.css"


export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new personal note.",
  openGraph: {
    title: "Create Note",
    description: "Create a new personal note.",
    url: "https://notehub.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}

