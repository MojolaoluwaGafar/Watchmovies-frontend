// import { useEffect, useState, useContext } from "react";
import HeroSection from "../components/HeroSection";
// import MovieList from "../components/Movie/MovieList";
// import { WatchlistContext } from "../Context/WatchlistContext";
// import { LikeContext } from "../Context/LikeContext";
import Search from "../components/Search"

const Home = () => {
  // const [trendingMovies, setTrendingMovies] = useState([]);
  // const [popularMovies, setPopularMovies] = useState([]);
  // const [topRatedMovies, setTopRatedMovies] = useState([]);

  // const { watchlist, toggleWatchlist } = useContext(WatchlistContext);
  // const { likedMovies, toggleLike } = useContext(LikeContext);

  // useEffect(() => {
  //   const fetchMovies = async (category, setter) => {
  //     try {
  //       const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  //       let url;

  //       if (category === "trending") {
  //         url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US&page=1`;
  //       } else {
  //         url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`;
  //       }

  //       const response = await fetch(url);
  //       if (!response.ok) throw new Error("Failed to fetch");

  //       const data = await response.json();

  //       if (data.results) {
  //         setter(
  //           data.results
  //             .filter((movie) => movie && movie.id)
  //             .map((movie) => ({
  //               id: movie.id,
  //               title: movie.title,
  //               imageUrl: movie.poster_path
  //                 ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
  //                 : "/default.jpg",
  //               rating: movie.vote_average
  //                 ? movie.vote_average.toFixed(1)
  //                 : "N/A",
  //             }))
  //         );
  //       }
  //     } catch (error) {
  //       console.error(`Error fetching ${category} movies:`, error);
  //     }
  //   };

  //   fetchMovies("trending", setTrendingMovies);
  //   fetchMovies("popular", setPopularMovies);
  //   fetchMovies("top_rated", setTopRatedMovies);
  // }, []);

  return (
    <div className="bg-gray-900 min-h-screen">
      <Search />
      <HeroSection />






      {/* <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center text-center">
          🔥 Trending Movies
        </h2>
        <MovieList
          movies={trendingMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
          onLikeToggle={toggleLike}
          likedMovies={likedMovies}
        />
      </section>

      <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center text-center">
          🌟 Popular Movies
        </h2>
        <MovieList
          movies={popularMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
          onLikeToggle={toggleLike}
          likedMovies={likedMovies}
        />
      </section>

      <section className="container mx-auto my-8 px-4">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center justify-center text-center">
          🏆 Top Rated Movies
        </h2>
        <MovieList
          movies={topRatedMovies}
          onWatchlistToggle={toggleWatchlist}
          watchlist={watchlist}
          onLikeToggle={toggleLike}
          likedMovies={likedMovies}
        />
      </section> */}
    </div>
  );
};

export default Home;
