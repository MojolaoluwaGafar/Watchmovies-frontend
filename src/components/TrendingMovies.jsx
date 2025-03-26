import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
         const apiKey = import.meta.env.VITE_TMDB_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
        );
        const data = await response.json();
        if (data.results) {
          setMovies(data.results.slice(0, 24)); // Limit to 24 movies
        } else {
          setError("No trending movies found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div className="text-center text-white text-lg font-semibold py-10">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-lg font-semibold py-10">
        {error}
      </div>
    );

  return (
    <section className="py-10 px-4 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        🎬 Trending Movies
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} navigate={navigate} />
        ))}
      </div>
    </section>
  );
};

const MovieCard = ({ movie, navigate }) => (
  <div
    className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
    onClick={() => navigate(`/movie/${movie.id}`)}
  >
    <img
      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
      alt={movie.title}
      className="w-full h-60 object-cover rounded-t-xl"
    />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xs p-2">
      <p>{movie.overview?.substring(0, 80)}...</p>
    </div>
    <div className="p-4 text-center">
      <h3 className="text-sm font-semibold text-white">{movie.title}</h3>
      <p className="text-yellow-400 text-xs mt-1">
        ⭐ {movie.vote_average?.toFixed(1) || "N/A"}/10
      </p>
    </div>
  </div>
);

// ✅ PropTypes Validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};

export default TrendingMovies;
