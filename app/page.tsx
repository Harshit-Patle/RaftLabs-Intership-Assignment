import { getTopRatedMovies, searchMovies, getMoviesByGenre } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import GenreFilter from '@/components/GenreFilter';
import Pagination from '@/components/Pagination';

type Props = {
  searchParams: Promise<{ query?: string; genre?: string; page?: string }>;
};

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query || '';
  const genre = resolvedSearchParams?.genre || '';
  const page = Number(resolvedSearchParams?.page) || 1;

  let movies;
  let title;

  if (query) {
    movies = await searchMovies(query, page);
    title = `Search results for "${query}"`;
  } else if (genre) {
    movies = await getMoviesByGenre(genre, page);
    title = "Filtered Results";
  } else {
    movies = await getTopRatedMovies(page);
    title = "Top 250 Movies from TMDB";
  }

  const imageBase = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white flex flex-col">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Cinema<span className="text-yellow-500">Directory</span>
          </h1>
          <p className="text-slate-400 mt-2">{title}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <GenreFilter />
          <SearchBar />
        </div>
      </header>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <Link
                href={`/movie/${movie.id}`}
                key={movie.id}
                className="group relative bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-yellow-500/50 transition duration-300"
              >
                <div className="aspect-[2/3] relative">
                  {movie.poster_path ? (
                    <Image
                      src={`${imageBase}${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg truncate group-hover:text-yellow-400 transition-colors">
                    {movie.title}
                  </h2>

                  <div className="flex items-center justify-between mt-2 text-sm text-slate-400">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="font-medium text-white">{movie.vote_average.toFixed(1)}</span>
                    </div>
                    <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        
          <Pagination />
        </>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-xl">No movies found.</p>
        </div>
      )}
    </main>
  );
}