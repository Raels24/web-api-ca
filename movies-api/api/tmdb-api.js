import fetch from 'node-fetch';

const TMDB_BASE = 'https://api.themoviedb.org/3';

const tmdbFetch = async (path) => {
    const response = await fetch(`${TMDB_BASE}${path}`);
    if (!response.ok) {
        throw new Error(response.json().message);
    }
    return await response.json();
};

export const getMovies = async () => {
    return await tmdbFetch(`/discover/movie?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`);
};
    
export const getMovie = async (id) => {
    return await tmdbFetch(`/movie/${id}?api_key=${process.env.TMDB_KEY}&language=en-US`);
};

export const getUpcomingMovies = async () => {
    return await tmdbFetch(`/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`);
};

export const getPopularMovies = async () => {
    return await tmdbFetch(`/movie/popular?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`);
};

export const getTopRatedMovies = async () => {
    return await tmdbFetch(`/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`);
};

export const getTrendingMovies = async () => {
    return await tmdbFetch(`/trending/movie/week?api_key=${process.env.TMDB_KEY}`);
};


