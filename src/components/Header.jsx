import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
// import { BiSolidCameraMovie } from "react-icons/bi";


const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" className="text-2xl font-bold text-teal-200">
            <div className="flex flex-col items-center">
              <p>
                <span className="text-sm relative">WATCH</span>
              </p>
              <p>
                <span className="">MOVIES</span>
              </p>
            </div>
            {/* <div>
              <span className="absolute top-7 left-22">
                <BiSolidCameraMovie size={20} />
              </span>
            </div> */}
          </Link>
        </motion.div>

        <button className="text-teal-400 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <HiX size={30} /> : <HiMenuAlt3 size={30} />}
        </button>

        <nav className="hidden md:flex gap-6 text-white">
          {[
            { name: "Trending", path: "/trending" },
            { name: "Popular", path: "/popular" },
            { name: "Top Rated", path: "/top-rated" }, // Changed to "/top-rated"
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={item.path} className="hover:text-teal-400">
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="text-teal-400">Hi, {user.username}!</span>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/watchlist"
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  My Watchlist
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={logout}
                className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/signin"
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Link
                  to="/signup"
                  className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 w-full max-h-[70vh] bg-black bg-opacity-95 shadow-md py-6 px-6 md:hidden rounded-b-lg z-[9999]"
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-6 text-teal-400"
            >
              <HiX size={30} />
            </button>

            <nav className="flex flex-col items-center gap-6 text-white mt-10">
              {[
                { name: "Trending", path: "/trending" },
                { name: "Popular", path: "/popular" },
                { name: "Top Rated", path: "/top-rated" }, // Changed to "/top-rated"
              ].map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.path}
                    onClick={toggleMenu}
                    className="hover:text-teal-400"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {user ? (
                <>
                  <span className="text-teal-400">Hi, {user.username}!</span>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/watchlist"
                      onClick={toggleMenu}
                      className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                    >
                      My Watchlist
                    </Link>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                  >
                    Logout
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/signin"
                      onClick={toggleMenu}
                      className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Link
                      to="/signup"
                      onClick={toggleMenu}
                      className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
