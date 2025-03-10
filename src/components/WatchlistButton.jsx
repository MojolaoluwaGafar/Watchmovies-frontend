import PropTypes from "prop-types";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { WatchlistContext } from "../Context/WatchlistContext";
import { useNavigate } from "react-router-dom";

const WatchlistButton = ({ movie }) => {
  const { user } = useContext(AuthContext);
  const { toggleWatchlist, watchlist } = useContext(WatchlistContext);
  const navigate = useNavigate();

  if (!movie) return null;

  const handleWatchlist = () => {
    if (user) {
      toggleWatchlist(movie);
    } else {
      navigate("/signin", {
        state: {
          message: "You need to sign in to add movies to your watchlist!",
        },
      });
    }
  };

  const isInWatchlist = watchlist.some((m) => m?.id === movie.id);

  return (
    <button
      onClick={handleWatchlist}
      className={`border px-4 py-2 rounded-md ${
        isInWatchlist
          ? "bg-teal-400 text-black"
          : "hover:bg-teal-400 hover:text-black"
      }`}
    >
      {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
};

// ✅ Prop validation for WatchlistButton
WatchlistButton.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
};

export default WatchlistButton;
