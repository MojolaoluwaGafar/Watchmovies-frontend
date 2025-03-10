import { useState, useEffect } from "react";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=2ac430ef`
        );
        const data = await response.json();

        if (data.results) {
          setMovies(data.results); // Set the movie results from the API
        } else {
          setError("No top rated movies found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Top Rated Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <h3 className="text-lg font-semibold p-4">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedMovies;
