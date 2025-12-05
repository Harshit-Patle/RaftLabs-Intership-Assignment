const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    runtime: number;
    tagline: string;
    genres: { id: number; name: string }[];
}

async function fetchFromTMDB(endpoint: string, page: number = 1) {
    if (!API_KEY) throw new Error('API Key is missing');

    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US&page=${page}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function getTopRatedMovies(page: number = 1): Promise<Movie[]> {
    const data = await fetchFromTMDB('/movie/top_rated', page);
    return data.results;
}

export async function searchMovies(query: string, page: number = 1): Promise<Movie[]> {
    const data = await fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`, page);
    return data.results;
}

export async function getMoviesByGenre(genreId: string, page: number = 1): Promise<Movie[]> {
    const data = await fetchFromTMDB(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc`, page);
    return data.results;
}

export async function getMovie(id: string) {
    const data = await fetchFromTMDB(`/movie/${id}`);
    return data;
}