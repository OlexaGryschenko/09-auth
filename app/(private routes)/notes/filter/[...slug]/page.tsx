// app/notes/page.tsx
import { Metadata } from "next";


import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { fetchNotes } from '@/lib/api/serverApi'; 

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams.slug[0] || "all";
  
  const formattedTag = tag === "all" 
    ? "All Notes" 
    : tag.charAt(0).toUpperCase() + tag.slice(1);

  return {
    title: `${formattedTag} | NoteHub`,
    description: `View your notes filtered by ${formattedTag}`,
    openGraph: {
      title: `${formattedTag} | NoteHub`,
      description: `View your notes filtered by ${formattedTag}`,
      url: `https://notehub.com/notes/filter/${tag}`,
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
}


export default async function NotesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const currentTag = slug && slug.length > 0 ? slug[0] : "all";
  const apiTag = currentTag === "all" ? "" : currentTag;


  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", apiTag],
    queryFn: () => fetchNotes({ page: 1, tag: apiTag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={currentTag}/>
    </HydrationBoundary>
  );
}
