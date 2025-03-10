import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, onWatchlistToggle, isWatchlisted }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWatchlistClick = () => {
    if (user) {
      onWatchlistToggle(movie);
    } else {
      navigate("/signin", {
        state: { message: "Sign in to add to your watchlist!" },
      });
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
      <p className="text-yellow-400 text-sm mt-1">⭐ {movie.imdbRating}/10</p>
      <button
        className={`mt-3 w-full ${
          isWatchlisted ? "bg-red-500" : "bg-teal-500"
        } hover:opacity-80 text-white py-2 rounded`}
        onClick={handleWatchlistClick}
      >
        {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
  }).isRequired,
  onWatchlistToggle: PropTypes.func.isRequired,
  isWatchlisted: PropTypes.bool.isRequired,
};

export default MovieCard;
