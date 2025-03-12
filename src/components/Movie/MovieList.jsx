import PropTypes from "prop-types";
import { useContext } from "react";
import MovieCard from "./MovieCard";
import { LikeContext } from "../../Context/LikeContext"; // ✅ Import LikeContext

const MovieList = ({ movies = [], onWatchlistToggle, watchlist = [] }) => {
  const { likedMovies, toggleLike } = useContext(LikeContext); // ✅ Use LikeContext

  // Filter out null/undefined movies before rendering
  const validMovies = movies.filter((movie) => movie && movie.id);

  if (validMovies.length === 0) {
    return <p className="text-gray-400 text-center">No movies available</p>;
  }

  return (
    <div className="relative">
      {/* Horizontal scroll for mobile */}
      <div className="flex lg:hidden gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {validMovies.map((movie) => (
          <div key={movie.id} className="snap-center flex-shrink-0 w-40">
            <MovieCard
              movie={movie}
              onWatchlistToggle={onWatchlistToggle}
              isWatchlisted={watchlist.some((m) => m?.id === movie.id)}
              onLikeToggle={toggleLike} // ✅ Pass Like Toggle
              isLiked={likedMovies.some((m) => m.id === movie.id)} // ✅ Check if liked
            />
          </div>
        ))}
      </div>

      {/* Grid layout for large screens */}
      <div className="hidden lg:grid grid-cols-4 xl:grid-cols-5 gap-6">
        {validMovies.slice(0, 15).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onWatchlistToggle={onWatchlistToggle}
            isWatchlisted={watchlist.some((m) => m?.id === movie.id)}
            onLikeToggle={toggleLike} // ✅ Pass Like Toggle
            isLiked={likedMovies.some((m) => m.id === movie.id)} // ✅ Check if liked
          />
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
  onWatchlistToggle: PropTypes.func.isRequired,
  watchlist: PropTypes.array,
};

export default MovieList;
