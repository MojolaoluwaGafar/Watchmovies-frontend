import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Get from .env

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || ""; // Get query from URL
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
        );
        const data = await res.json();

        if (res.ok && data.results.length > 0) {
          setMovies(data.results);
          setError("");
        } else {
          setMovies([]);
          setError("No movies found");
        }
      } catch (err) {
        setError(`Error searching for the movie: ${err.message}`);
        console.error("Search error:", err);
      }
    };

    fetchMovies();
  }, [query]); // Fetch movies when query changes

  return (
    <div className="py-10 px-5">
      <h1 className="text-3xl font-bold text-teal-500 text-center">
        Search Results for {query}
      </h1>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      {/* Search Results Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer bg-gray-900 p-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "https://via.placeholder.com/300"
              }
              alt={movie.title || "No Title"}
              className="w-full h-60 object-cover rounded-md"
            />
            <h3 className="text-lg font-bold mt-2 text-white">
              {movie.title || "Untitled"}
            </h3>
            <p className="text-gray-400">
              {movie.release_date
                ? movie.release_date.split("-")[0]
                : "Unknown Year"}{" "}
              | ⭐ {movie.vote_average || "N/A"}
            </p>
            <p className="text-sm text-gray-300 mt-2">
              {movie.overview
                ? movie.overview.slice(0, 100) + "..."
                : "No description available."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
