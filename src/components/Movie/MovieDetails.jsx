import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-white text-xl mt-10">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-xl mt-10">{error}</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      {movie && (
        <div className="max-w-4xl w-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <img
              className="w-full md:w-1/3 object-cover"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="p-6 md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 text-sm mb-4">{movie.tagline}</p>
              <p className="mb-4">{movie.overview}</p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  Release Date: {movie.release_date}
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  Rating: ⭐ {movie.vote_average}/10
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                  Runtime: {movie.runtime} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
