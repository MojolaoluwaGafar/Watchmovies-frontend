import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, onWatchlistToggle, watchlist }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onWatchlistToggle={onWatchlistToggle}
          isWatchlisted={watchlist.some((m) => m.id === movie.id)}
        />
      ))}
    </div>
  );
};

export default MovieList;
