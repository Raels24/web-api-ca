import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews"
import LanguageIcon from "@mui/icons-material/Language";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import { getMovieRecommendations } from "../../api/tmdb-api";
import { getMovieVideos } from "../../api/tmdb-api";






const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const MovieDetails = ({ movie }) => {  
const [drawerOpen, setDrawerOpen] = useState(false);

const { data: credits } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

const { data: recommendations } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
});

const { data: videos } = useQuery({
    queryKey: ["videos", { id: movie.id }],
    queryFn: getMovieVideos,
});



  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {movie.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count})`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

       <Paper component="ul" sx={{ ...root }}>
  <li>
    <Chip label="Production countries" sx={{ ...chip }} color="secondary" />
  </li>
  {movie.production_countries && movie.production_countries.length > 0 ? (
    movie.production_countries.map((country) => (
      <li key={country.name}>
        <Chip label={country.name} sx={{ ...chip }} />
      </li>
    ))
  ) : (
    <li>
      <Chip label="N/A" sx={{ ...chip }} />
    </li>
  )}
</Paper>

<Paper component="ul" sx={{ ...root }}>
  <Chip
    icon={<LanguageIcon />}
    label={`Original Language: ${movie.original_language.toUpperCase()}`}
    sx={{ ...chip }}
    color="primary"
  />
</Paper>

<Paper component="ul" sx={{ ...root }}>
  <li>
    <Chip label="Cast" sx={{ ...chip }} color="secondary" />
  </li>
  {credits && credits.cast && credits.cast.length > 0 ? (
    credits.cast.slice(0, 10).map((member) => (
      <li key={member.cast_id}>
        <Chip label={member.name} sx={{ ...chip }} />
      </li>
    ))
  ) : (
    <li>
      <Chip label="N/A" sx={{ ...chip }} />
    </li>
  )}
</Paper>

<Paper component="div" sx={{ ...root, flexDirection: "column", alignItems: "center" }}>
    {videos && videos.results && videos.results.length > 0 && videos.results
      .filter((v) => v.site === "YouTube" && v.type === "Trailer")
      .slice(0, 1)
      .map((trailer) => (
        <iframe
          key={trailer.id}
          width="500"
          height="300"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          allowFullScreen
        />
      ))}
  </Paper>


<Paper component="ul" sx={{ ...root }}>
  <li>
    <Chip label="Recommended Movies" sx={{ ...chip }} color="primary" />
  </li>
  {recommendations && recommendations.results && recommendations.results.length > 0 ? (
    recommendations.results.slice(0, 5).map((rec) => (
      <li key={rec.id}>
        <Chip label={rec.title} sx={{ ...chip }} />
      </li>
    ))
  ) : (
    <li>
      <Chip label="N/A" sx={{ ...chip }} />
    </li>
  )}
</Paper>

            <Fab
        color="secondary"
        variant="extended"
        onClick={() =>setDrawerOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '1em',
          right: '1em'
        }}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>

    </>
  );
};
export default MovieDetails ;
