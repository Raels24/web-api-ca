import React, { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";  
import Stack from "@mui/material/Stack";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [page, setPage] = useState(1);
  const moviesPerPage = 10;
  const [sortOrder, setSortOrder] = useState("none");

  //filtering movies based on user input
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    })
    .filter((m) => {
      return m.vote_average >= ratingFilter;
    });

  //sorting movies based on user input
  if (sortOrder === "rating-desc") {
    displayedMovies.sort((a, b) => b.vote_average - a.vote_average);
  } else if (sortOrder === "rating-asc") {
    displayedMovies.sort((a, b) => a.vote_average - b.vote_average);
  }

    //pagination logic
  const pageCount = Math.ceil(displayedMovies.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const paginatedMovies = displayedMovies.slice(
    startIndex,
    startIndex + moviesPerPage
  );

  const handleChange = (type, value) => {
  if (type === "name") setNameFilter(value);
  else if (type === "genre") setGenreFilter(value);
  else if (type === "rating") setRatingFilter(value);
  else if (type === "sort") setSortOrder(value);
};

const handlePageChange = (event, value) => {
  setPage(value);
  window.scrollTo({ top: 0 });
};


  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            ratingFilter={ratingFilter}
            sortOrder={sortOrder}
          />
        </Grid>

        <Grid
          key="list" 
          size={{xs: 12, sm: 6, md: 8, lg: 9, xl: 10}} 
          sx={{padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch"
          }}
        >
          <Grid container spacing={3} sx={{ flex: 1 }}>
            <MovieList action={action} movies={paginatedMovies}></MovieList>
          </Grid>
          <Stack spacing={2} alignItems="center" sx={{ my: 4, width: "100%" }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              size="large"
            />
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default MovieListPageTemplate;
