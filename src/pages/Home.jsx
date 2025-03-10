import { useEffect, useState, useContext } from "react";
import HeroSection from "../components/HeroSection";
import MovieList from "../components/Movie/MovieList";
import { WatchlistContext } from "../Context/WatchlistContext";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext);

  useEffect(() => {
    const fetchMovies = async (type, setter) => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=2ac430ef&s=${type}`
        );
        const data = await response.json();
        if (data.Search) {
          setter(
            data.Search.map((movie) => ({
              id: movie.imdbID,
              title: movie.Title,
              imageUrl: movie.Poster !== "N/A" ? movie.Poster : "/default.jpg",
              rating: Math.floor(Math.random() * 5) + 6, // Random rating for now
            }))
          );
        }
      } catch (error) {
        console.error(`Error fetching ${type} movies:`, error);
      }
    };

    fetchMovies("trending", setTrendingMovies);
    fetchMovies("popular", setPopularMovies);
    fetchMovies("top rated", setTopRatedMovies);
  }, []);

  return (
    <div>
      <HeroSection />

      <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Trending Movies</h2>
        <MovieList
          movies={trendingMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
        />
      </section>

      <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Popular Movies</h2>
        <MovieList
          movies={popularMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
        />
      </section>

      <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Top Rated Movies</h2>
        <MovieList
          movies={topRatedMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
        />
      </section>
    </div>
  );
};

export default Home;
