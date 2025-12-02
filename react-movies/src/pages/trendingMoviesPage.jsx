import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import PageTemplate from "../components/templateMovieListPage";
import { getTrendingMovies } from "../api/tmdb-api";
import PlaylistAdd from "../components/cardIcons/playlistAdd";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const trendingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrendingMovies,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const movies = data.results;

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default trendingMoviesPage;
