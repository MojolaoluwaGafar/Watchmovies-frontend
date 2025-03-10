import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const toggleWatchlist = (movie) => {
    const updatedWatchlist = watchlist.some((m) => m.id === movie.id)
      ? watchlist.filter((m) => m.id !== movie.id)
      : [...watchlist, movie];

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Add prop validation for children
WatchlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
