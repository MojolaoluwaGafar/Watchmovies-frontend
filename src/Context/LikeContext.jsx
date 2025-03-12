import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState(
    JSON.parse(localStorage.getItem("likedMovies")) || []
  );

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  const toggleLike = (movie) => {
    const isAlreadyLiked = likedMovies.some((m) => m.id === movie.id);

    if (isAlreadyLiked) {
      setLikedMovies(likedMovies.filter((m) => m.id !== movie.id));
      toast.success(`${movie.title} removed from Liked Movies`);
    } else {
      setLikedMovies([...likedMovies, movie]);
      toast.success(`${movie.title} added to Liked Movies`);
    }
  };

  return (
    <LikeContext.Provider value={{ likedMovies, toggleLike }}>
      {children}
    </LikeContext.Provider>
  );
};

// ✅ Fix: PropTypes Validation
LikeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
