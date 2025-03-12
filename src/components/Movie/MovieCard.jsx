import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-hot-toast";

const MovieCard = ({
  movie,
  onWatchlistToggle,
  isWatchlisted,
  onLikeToggle,
  isLiked,
}) => {
  if (!movie || typeof movie !== "object") return null;

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); // Prevents navigation when clicking the button
    onWatchlistToggle(movie);
    toast.success(
      isWatchlisted
        ? `${movie.title || "This movie"} removed from Watchlist`
        : `${movie.title || "This movie"} added to Watchlist`
    );
  };

  const handleLikeToggle = (e) => {
    e.preventDefault(); // Prevents navigation when clicking the like button
    onLikeToggle(movie);
    toast.success(
      isLiked
        ? `${movie.title || "This movie"} unliked`
        : `${movie.title || "This movie"} liked`
    );
  };

  return (
    <div className="relative bg-gray-900 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Movie Poster (Clickable to navigate) */}
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative w-full h-60 rounded-xl overflow-hidden">
          <img
            src={movie.imageUrl}
            alt={movie?.title || "Movie Poster"}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      {/* Like (Heart) Button (Not inside <Link>, so it won't trigger navigation) */}
      <button
        type="button"
        className="absolute top-2 right-2 bg-black/50 backdrop-blur-md p-2 rounded-full transition duration-300 hover:bg-black"
        onClick={handleLikeToggle}
      >
        {isLiked ? (
          <FaHeart className="text-red-500 text-lg transition-all duration-300" />
        ) : (
          <FaRegHeart className="text-gray-400 text-lg transition-all duration-300 hover:text-red-500" />
        )}
      </button>

      {/* Movie Details */}
      <div className="mt-3">
        <h3 className="font-semibold text-lg truncate">
          {movie?.title || "Unknown Title"}
        </h3>

        {/* Release Date */}
        <p className="text-sm text-gray-400 mt-1">
          {movie.release_date
            ? `📅 Released: ${movie.release_date}`
            : "📅 Release date unknown"}
        </p>

        {/* Rating */}
        <p className="text-sm text-gray-400 mt-1">
          ⭐ {movie?.vote_average ? movie.vote_average.toFixed(1) : "No Rating"}
        </p>

        {/* Movie Overview */}
        {movie.overview && (
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">
            {movie.overview}
          </p>
        )}

        {/* Watchlist Button (No Navigation Trigger) */}
        <button
          type="button"
          className={`mt-3 w-full py-2 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center ${
            isWatchlisted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={handleWatchlistToggle}
        >
          {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  );
};

// ✅ PropTypes Validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired, // Ensure ID is required for navigation
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    overview: PropTypes.string,
  }),
  onWatchlistToggle: PropTypes.func.isRequired,
  isWatchlisted: PropTypes.bool,
  onLikeToggle: PropTypes.func.isRequired,
  isLiked: PropTypes.bool,
};

export default MovieCard;
