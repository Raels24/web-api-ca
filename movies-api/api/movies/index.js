import express from 'express';
import asyncHandler from 'express-async-handler';
import { getMovies, getMovie, getPopularMovies, getTopRatedMovies, getTrendingMovies, getUpcomingMovies, getGenres, getMovieCredits, getMovieImages, getMovieRecommendations, getMovieReviews, getMovieVideos } from '../tmdb-api'; 


const router = express.Router();

router.get('/discover', asyncHandler(async (req, res) => {
    const discoverMovies = await getMovies();
    res.status(200).json(discoverMovies);
}));

router.get('/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/toprated', asyncHandler(async (req, res) => {
    const topRatedMovies = await getTopRatedMovies();
    res.status(200).json(topRatedMovies);
}));

router.get('/trending', asyncHandler(async (req, res) => {
    const trendingMovies = await getTrendingMovies();
    res.status(200).json(trendingMovies);
}));

router.get('/credits/:id', asyncHandler(async (req, res) => {
    const credits = await getMovieCredits(req.params.id);
    res.status(200).json(credits);
}));

router.get('/recommendations/:id', asyncHandler(async (req, res) => {
    const recommendations = await getMovieRecommendations(req.params.id);
    res.status(200).json(recommendations);
}));

router.get('/reviews/:id', asyncHandler(async (req, res) => {
    const reviews = await getMovieReviews(req.params.id);
    res.status(200).json(reviews);
}));

router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/videos/:id', asyncHandler(async (req, res) => {
    const videos = await getMovieVideos(req.params.id);
    res.status(200).json(videos);
}));

router.get('/images/:id', asyncHandler(async (req, res) => {
    const images = await getMovieImages(req.params.id);
    res.status(200).json(images);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const movie = await getMovie(req.params.id);
    res.status(200).json(movie);
}));

export default router;
