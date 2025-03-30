import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!TMDB_API_KEY) {
        setError("API Key is missing.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const [movieRes, videoRes, similarRes, castRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
          ),
        ]);

        if (!movieRes.ok || !videoRes.ok || !similarRes.ok || !castRes.ok) {
          throw new Error("Failed to fetch one or more movie details.");
        }

        const [movieData, videoData, similarMoviesData, creditsData] =
          await Promise.all([
            movieRes.json(),
            videoRes.json(),
            similarRes.json(),
            castRes.json(),
          ]);

        setMovie(movieData);
        setSimilarMovies(similarMoviesData.results);
        setCast(creditsData.cast.slice(0, 6));

        const officialTrailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (officialTrailer) setTrailerKey(officialTrailer.key);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovieDetails();
  }, [id]);

  if (loading)
    return (
      <motion.div
        className="text-center text-white text-lg animate-pulse"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Loading...
      </motion.div>
    );
  if (error)
    return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <motion.div
      className="relative bg-cover bg-center min-h-screen flex items-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg-gradient-to-t from-black via-black/70 to-transparent w-full h-full absolute top-0 left-0"></div>

      {movie && (
        <motion.div
          className="container mx-auto p-6 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />

            <motion.div
              className="md:ml-8 text-center md:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="italic text-yellow-400 mb-4">{movie.tagline}</p>
              )}
              <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>

              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mt-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link to={`/watch/${id}`}>🎬 Watch Now</Link>
              </motion.button>

              <motion.button
                onClick={() => navigate(-1)}
                className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg ml-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ⬅ Go Back
              </motion.button>
            </motion.div>
          </div>

          {trailerKey && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">🎬 Trailer</h2>
              <div className="w-full md:w-3/4 mx-auto">
                <iframe
                  className="w-full h-64 md:h-96 rounded-lg"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {cast.length > 0 && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">🎭 Cast</h2>
              <div className="flex gap-4 overflow-x-auto">
                {cast.map((actor) => (
                  <div key={actor.id} className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="rounded-lg w-24 h-24 object-cover"
                    />
                    <p className="mt-2 text-sm">{actor.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {similarMovies.length > 0 && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-4">🎬 Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {similarMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="hover:scale-105 transition"
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg w-full h-48 object-cover"
                    />
                    <p className="text-center mt-2 font-semibold">
                      {movie.title}
                    </p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MovieDetails;
