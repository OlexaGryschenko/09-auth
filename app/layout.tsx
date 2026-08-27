// app/layout.tsx

import "modern-normalize/modern-normalize.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Metadata } from 'next';

import { Roboto } from "next/font/google";

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

//  <<<<<<<<<<  FONT >>>>>>>>>>>>>>>> 

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});


// <<<<<<<<<<<<<<<<<  metaData >>>>>>>>>>>>>

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub for you",
  openGraph: {
      title: "NoteHub",
      description: "NoteHub for you",
      url: "https://notehub.com",
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "NoteHub",
        },
      ]},  
};



export default function RootLayout({ children, modal, }: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />

          <main>
            {children}
            {modal}
          </main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
