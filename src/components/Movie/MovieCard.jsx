import React from "react";

const MovieCard = ({ movie, onWatchlistToggle, isWatchlisted }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
      <p className="text-yellow-400 text-sm mt-1">⭐ {movie.rating}/10</p>
      <button
        className={`mt-3 w-full ${
          isWatchlisted ? "bg-red-500" : "bg-teal-500"
        } hover:opacity-80 text-white py-2 rounded`}
        onClick={() => onWatchlistToggle(movie)}
      >
        {isWatchlisted ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default MovieCard;
