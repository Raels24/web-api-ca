import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./authContext"; 
import { getFavorites, addFavorite, removeFavorite } from "../api/favorites-api";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [myReviews, setMyReviews] = useState( {} ) 
    const [favorites, setFavorites] = useState([])
    const [mustWatch, setMustWatch] = useState([]);

    const { authToken, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      const loadFavorites = async () => {
        try {
          if (!isAuthenticated) {
            setFavorites([]);
            return;
          }
          const data = await getFavorites();
          setFavorites(data.map((f) => f.movieId));
        } catch (err) {
          setFavorites([]);
        }
      };

      loadFavorites();
    }, [authToken, isAuthenticated]);


  const addToFavorites = async (movie) => {
   if (favorites.includes(movie.id)) return;
try {
    await addFavorite(movie.id);
    setFavorites( [...favorites, movie.id] );
    console.log("Favorites:", [...favorites, movie.id]);
} catch (err) {
    console.error("Failed to add favorite:", err);
}
  };

  const addToMustWatch = (movie) => {
  let newMustWatch = [];
  if (!mustWatch.includes(movie.id)) {
    newMustWatch = [...mustWatch, movie.id];
  } else {
    newMustWatch = [...mustWatch];
  }
  setMustWatch(newMustWatch);
  console.log("Must Watch:", newMustWatch);
};


    const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const removeFromFavorites = async (movie) => {
    try {
      await removeFavorite(movie.id);
      setFavorites( favorites.filter(
        (mId) => mId !== movie.id
      ) )
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

   return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        mustWatch,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};



export default MoviesContextProvider;
