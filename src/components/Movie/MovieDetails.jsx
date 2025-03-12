import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      <div className="text-center text-white text-lg animate-pulse">
        Loading...
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 text-lg">{error}</div>;

  return (
    <div
      className="relative bg-cover bg-center min-h-screen flex items-center text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
      }}
    >
      <div className="bg-gradient-to-t from-black via-black/70 to-transparent w-full h-full absolute top-0 left-0"></div>

      {movie && (
        <div className="container mx-auto p-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full md:w-1/3 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />

            <div className="md:ml-8 text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="italic text-yellow-400 mb-4">{movie.tagline}</p>
              )}
              <p className="text-gray-300 text-lg mb-6">{movie.overview}</p>

              <div className="text-gray-400 space-y-2">
                <p>
                  <strong className="text-white">📅 Release Date:</strong>{" "}
                  {movie.release_date || "Unknown"}
                </p>
                <p>
                  <strong className="text-white">⭐ Rating:</strong>{" "}
                  {movie.vote_average?.toFixed(1) || "No Rating"}/10
                </p>
                <p>
                  <strong className="text-white">🎭 Genres:</strong>{" "}
                  {movie.genres?.map((g) => g.name).join(", ") || "N/A"}
                </p>
                <p>
                  <strong className="text-white">⏳ Runtime:</strong>{" "}
                  {movie.runtime ? `${movie.runtime} minutes` : "N/A"}
                </p>
              </div>

              <div className="mt-6 flex flex-col md:flex-row gap-4">
                {trailerKey && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold mb-2">
                      🎥 Official Trailer
                    </h2>
                    <iframe
                      className="w-full md:w-3/4 h-64 md:h-96 rounded-lg shadow-lg"
                      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
                >
                  ⬅ Go Back
                </button>
              </div>
            </div>
          </div>
          {cast.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">🎭 Cast</h2>
              <div className="flex space-x-4 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-gray-700">
                {cast.map((actor) => (
                  <div key={actor.id} className="text-center min-w-[120px]">
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "/default-avatar.png"
                      }
                      alt={actor.name}
                      className="w-24 h-24 object-cover rounded-full mx-auto border border-gray-500 shadow-lg"
                    />
                    <p className="text-white text-sm mt-2 font-semibold">
                      {actor.name}
                    </p>
                    <p className="text-gray-400 text-xs italic">
                      {actor.character}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similarMovies.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">🔗 Similar Movies</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {similarMovies.slice(0, 8).map((movie) => (
                  <div
                    key={movie.id}
                    className="cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-lg shadow-lg hover:opacity-80"
                    />
                    <p className="text-white mt-2 text-center">{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
