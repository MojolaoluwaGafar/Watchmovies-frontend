import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
          let shuffledMovies = data.results
            .sort(() => 0.5 - Math.random()) // Shuffle movies randomly
            .slice(0, 20) // Take only 20 movies

            .map((movie) => ({
              title: movie.title,
              description: movie.overview,
              imageUrl: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              year: movie.release_date.split("-")[0],
              id: movie.id,
            }));

          preloadImages(shuffledMovies);
          setMovies(shuffledMovies);
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
      }, 5000); // Change slide every 5s
      return () => clearInterval(interval);
    }
  }, [movies]);

  const preloadImages = (movies) => {
    movies.forEach((movie) => {
      const img = new Image();
      img.src = movie.imageUrl;
    });
  };

  if (loading) {
    return (
      <section className="h-[80vh] flex justify-center items-center text-white">
        <p>Loading popular movies...</p>
      </section>
    );
  }

  const movie = movies[currentMovieIndex];

  return (
    <section className="relative h-[80vh] flex justify-center items-center text-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${movie.imageUrl}')` }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 p-6 rounded-lg text-white">
        <motion.h1
          key={movie.title}
          className="text-4xl md:text-6xl font-extrabold drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          {movie.title} <span className="text-red-500">({movie.year})</span>
        </motion.h1>

        <motion.p
          key={movie.description}
          className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {movie.description.length > 150
            ? movie.description.substring(0, 150) + "..."
            : movie.description}
        </motion.p>

        <motion.div
          className="mt-6 flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
