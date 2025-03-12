import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        const data = await response.json();

        if (data.results) {
          const shuffledMovies = data.results
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
          setMovies(
            shuffledMovies.map((movie) => ({
              title: movie.title,
              description: movie.overview,
              imageUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              year: movie.release_date.split("-")[0],
              id: movie.id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching movies for Hero Section:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentMovieIndex((prev) => (prev + 1) % movies.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies]);

  if (loading) {
    return (
      <section className="h-[80vh] flex justify-center items-center text-white">
        <p>Loading featured movies...</p>
      </section>
    );
  }

  const movie = movies[currentMovieIndex];

  return (
    <section
      className="relative h-[80vh] flex flex-col justify-center items-center text-center bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{ backgroundImage: `url('${movie.imageUrl}')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>

      <div className="relative z-10 p-6 rounded-lg text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          {movie.title} <span className="text-red-500">({movie.year})</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto drop-shadow-md">
          {movie.description.length > 150
            ? movie.description.substring(0, 150) + "..."
            : movie.description}
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to={`/movie/${movie.id}`}
            className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-red-500 hover:shadow-red-500/50"
          >
            🎬 View Details
          </Link>

          <Link
            to="/movies"
            className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800 hover:shadow-gray-500/50"
          >
            🍿 Explore More Movies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
