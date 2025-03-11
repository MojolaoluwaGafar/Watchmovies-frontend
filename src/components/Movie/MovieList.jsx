import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { fetchPopularMovies } from "../../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        console.log("Fetched Movies:", data); // Debugging line
        setMovies(data.results || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);


  if (loading) {
    return <p className="text-center text-white">Loading movies...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {movies.length > 0 ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p className="text-center col-span-full text-white">
          No movies available.
        </p>
      )}
    </div>
  );
};

export default MovieList;
