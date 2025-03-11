const API_KEY = "35e506fd9b296749fec3d8b8118e2652";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  if (!response.ok) throw new Error("Failed to fetch movies");
  return response.json();
};
