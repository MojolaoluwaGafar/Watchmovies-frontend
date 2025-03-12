import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=35e506fd9b296749fec3d8b8118e2652`
        );
        const data = await response.json();

        if (data.results) {
          setMovies(data.results);
        } else {
          setError("No top-rated movies found.");
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
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        ⭐ Top Rated Movies
      </h2>

      {/* Movie Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105 cursor-pointer"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />

            {/* Overlay Effect */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex justify-center items-center text-white text-xs p-2">
              <p>{movie.overview.substring(0, 80)}...</p>
            </div>

            {/* Movie Info */}
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold text-white line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-yellow-400 text-xs mt-1">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMovies;
