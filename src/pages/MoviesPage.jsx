import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
        );

        if (!res.ok) throw new Error("Failed to fetch movies.");

        const data = await res.json();
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
        <h1 className="relative text-4xl font-bold text-white text-center py-3">
          Explore Movies
        </h1>

      <div className="container mx-auto p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <motion.div
              key={movie.id}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer bg-gray-800"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-64 object-cover transition duration-300 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <h2 className="text-lg font-semibold">{movie.title}</h2>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-transform transform hover:scale-105 shadow-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoviesPage;
