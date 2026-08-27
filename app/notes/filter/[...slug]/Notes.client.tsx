// app/notes/Notes.client.tsx
"use client";

import Link from "next/link";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import { fetchNotes } from "@/lib/api";
import css from "./NotesPage.module.css";

interface NotesClientProps {
  tag: string;
}


export default function NotesClient({ tag }: NotesClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  

  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const apiTag = tag === "all" ? "" : tag;

  const { data: response, isLoading } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearch, apiTag],
    queryFn: () => fetchNotes({
      page: currentPage,
      search: debouncedSearch,
      perPage: 12,
      tag: apiTag
    }),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (selectedItem: { selected: number }): void => {
    setCurrentPage(selectedItem.selected + 1);
  };

  const handleSearchChange = (value: string): void => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>My Notes</h1>

        <div className={css.controls}>
          <SearchBox value={searchQuery} onChange={handleSearchChange} />
            <Link href="/notes/action/create" className={css.addButton}>
             Create Note +
            </Link>
        </div>

        {isLoading ? (
          <p>Loading notes...</p>
        ) : (
          <><Pagination
            pageCount={response?.totalPages || 1}
            onPageChange={handlePageChange}
            forcePage={currentPage - 1}
          />
            <NoteList notes={response?.notes || []} />

          </>
        )}        
      </div>
    </main>
  );
}
