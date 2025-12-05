import { getMovie, getTopRatedMovies } from '@/lib/tmdb';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Calendar, Clock, ChevronLeft } from 'lucide-react';
import ShareButton from '@/components/ShareButton';

export async function generateStaticParams() {
    const movies = await getTopRatedMovies();
    return movies.map((movie) => ({
        id: movie.id.toString(),
    }));
}

type Props = {
    params: Promise<{ id: string }>
}

export default async function MoviePage({ params }: Props) {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const movie = await getMovie(id);
    const imageBase = 'https://image.tmdb.org/t/p/original';

    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 pb-20">
            <div className="relative h-[60vh] w-full">
                <div className="absolute inset-0 bg-slate-900/50" />
                <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                <div className="absolute top-6 left-6 z-10">
                    <Link
                        href="/"
                        className="flex items-center gap-2 bg-slate-900/50 backdrop-blur-md px-4 py-2 rounded-full hover:bg-slate-800 transition"
                    >
                        <ChevronLeft size={20} /> Back to Directory
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-32 relative z-10">
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="shrink-0 mx-auto md:mx-0">
                        <div className="relative w-64 h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-slate-900">
                            <Image
                                src={`${imageBase}${movie.poster_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 pt-4 md:pt-12 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
                        <p className="text-xl text-slate-400 italic mb-6">{movie.tagline}</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 text-sm">
                            <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full border border-yellow-500/20">
                                <Star size={16} fill="currentColor" />
                                <span className="font-bold">{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
                                <Calendar size={16} className="text-slate-400" />
                                <span>{movie.release_date}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full">
                                <Clock size={16} className="text-slate-400" />
                                <span>{hours}h {minutes}m</span>
                            </div>
                            <ShareButton />
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-8">
                            {movie.genres.map((g: any) => (
                                <span key={g.id} className="px-3 py-1 text-sm border border-slate-700 rounded-full text-slate-300">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        <div className="max-w-2xl">
                            <h3 className="text-lg font-semibold mb-2 text-white">Overview</h3>
                            <p className="text-slate-300 leading-relaxed">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}