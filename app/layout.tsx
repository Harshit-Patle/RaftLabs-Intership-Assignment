import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CinemaDirectory - Top Movies",
  description: "A directory of top rated movies powered by TMDB and Next.js 14.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
        <footer className="py-8 bg-slate-900 text-center text-slate-500 text-sm border-t border-slate-800">
          <p>
            Built for RaftLabs Assessment.
            Data provided by <a href="https://www.themoviedb.org/" target="_blank" className="underline hover:text-white">TMDB</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}