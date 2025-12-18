const API = "http://localhost:8080";

// gets the auth header with the token
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: token } : {};
};

// get favorites for logged-in user
export const getFavorites = async () => {
  const response = await fetch(`${API}/api/favorites`, {
    headers: {
      ...authHeader(),
    },
  });

  return response.json();
};

// add favorite
export const addFavorite = async (movieId) => {
  const response = await fetch(`${API}/api/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
    body: JSON.stringify({ movieId }),
  });

  return response.json();
};

// remove favorite
export const removeFavorite = async (movieId) => {
  const response = await fetch(`${API}/api/favorites/${movieId}`, {
    method: "DELETE",
    headers: {
      ...authHeader(),
    },
  });

  return response.json();
};
