import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block transform transition duration-300 hover:scale-105"
    >
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
        <p className="text-yellow-400 text-sm mt-1">
          ⭐ {movie.vote_average}/10
        </p>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;
