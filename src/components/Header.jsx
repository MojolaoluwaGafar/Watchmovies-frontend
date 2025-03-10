import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { HiMenuAlt3, HiX } from "react-icons/hi";


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          WatchNow
        </Link>

        <button className="text-teal-400 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>

        <nav className="hidden md:flex gap-6">
          <Link to="/trending" className="hover:text-teal-400">
            Trending
          </Link>
          <Link to="/popular" className="hover:text-teal-400">
            Popular
          </Link>
          <Link to="/top-rated" className="hover:text-teal-400">
            Top Rated
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-teal-400">Hi, {user.username}!</span>
              <Link
                to="/watchlist"
                className="hover:text-teal-400 border px-4 py-2 rounded-md"
              >
                My Watchlist
              </Link>
              <button
                onClick={logout}
                className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-black text-white py-4">
          <nav className="flex flex-col items-center gap-4">
            <Link
              to="/trending"
              onClick={toggleMenu}
              className="hover:text-teal-400"
            >
              Trending
            </Link>
            <Link
              to="/popular"
              onClick={toggleMenu}
              className="hover:text-teal-400"
            >
              Popular
            </Link>
            <Link
              to="/top-rated"
              onClick={toggleMenu}
              className="hover:text-teal-400"
            >
              Top Rated
            </Link>
            {user ? (
              <>
                <span className="text-teal-400">Hi, {user.username}!</span>
                <Link
                  to="/watchlist"
                  onClick={toggleMenu}
                  className="hover:text-teal-400 border px-4 py-2 rounded-md"
                >
                  My Watchlist
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={toggleMenu}
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
