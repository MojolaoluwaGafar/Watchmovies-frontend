import React, { useState, useEffect } from "react";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  // Remove movie from watchlist
  const removeFromWatchlist = (movieId) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== movieId);
    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Your Watchlist</h2>

        {watchlist.length === 0 ? (
          <p className="text-center text-gray-400">
            No movies in your watchlist yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {watchlist.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
                <p className="text-yellow-400 text-sm mt-1">
                  ⭐ {movie.rating}/10
                </p>
                <button
                  className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
                  onClick={() => removeFromWatchlist(movie.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
