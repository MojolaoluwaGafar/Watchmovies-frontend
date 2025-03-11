import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;



const MovieDetails = () => {
  const { id } = useParams();
  console.log("Movie ID:", id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Movie ID:", id);
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
        );
        console.log("API Request URL:", response.url);
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        console.log("Fetched Movie Data:", data);
        setMovie(data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch movie details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchMovieDetails();
  }, [id]);

  if (loading)
    return <div className="text-center text-white text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="bg-black bg-opacity-70 w-full h-full absolute top-0 left-0"></div>

      {movie && (
        <div className="container mx-auto p-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg shadow-lg"
            />

            <div className="md:ml-8 mt-6 md:mt-0 text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="italic text-yellow-400 mb-4">{movie.tagline}</p>
              )}
              <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>

              <div className="text-gray-400">
                <p className="mb-2">
                  <strong className="text-white">Release Date:</strong>
                  {movie.release_date}
                </p>
                <p className="mb-2">
                  <strong className="text-white">Rating:</strong> ⭐
                  {movie.vote_average}/10
                </p>
                <p className="mb-2">
                  <strong className="text-white">Genres:</strong>
                  {movie.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="mb-2">
                  <strong className="text-white">Runtime:</strong>
                  {movie.runtime} minutes
                </p>
              </div>

              <div className="mt-6 flex flex-col md:flex-row items-center md:items-start">
                {movie.homepage && (
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out mb-3 md:mb-0 md:mr-4"
                  >
                    🎬 Watch Trailer
                  </a>
                )}
                <button
                  onClick={() => window.history.back()}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 ease-in-out"
                >
                  ⬅ Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
