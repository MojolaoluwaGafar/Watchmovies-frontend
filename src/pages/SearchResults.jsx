import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <motion.div
      className="py-10 px-5 bg-gray-900 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Animated Title */}
      <motion.h1
        className="text-3xl font-bold text-teal-400 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Search Results for <span className="text-white">{query}</span>
      </motion.h1>

      {/* Error Message */}
      {error && (
        <motion.p
          className="text-red-500 text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {/* Search Results Grid */}
      <motion.div
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="cursor-pointer bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden"
            onClick={() => navigate(`/movie/${movie.id}`)}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
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

            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xs p-2"
              whileHover={{ opacity: 1 }}
            >
              <p>{movie.overview?.substring(0, 80)}...</p>
            </motion.div>

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-white">
                {movie.title || "Untitled"}
              </h3>
              <p className="text-yellow-400 text-sm">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                {movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "Unknown Year"}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
