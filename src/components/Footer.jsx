import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <Link to="/" className="text-2xl font-bold text-teal-200">
            <div className="flex flex-col items-center md:items-start">
              <p>
                <span className="text-sm ps-0 lg:ps-5">WATCH</span>
              </p>
              <p>
                <span>MOVIES</span>
              </p>
            </div>
          </Link>
          <p className="mt-2 text-sm text-gray-400">
            Your go-to platform for discovering and streaming top movies.
          </p>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/trending" className="hover:text-teal-400 transition">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/popular" className="hover:text-teal-400 transition">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="hover:text-teal-400 transition">
                Top Rated
              </Link>
            </li>
            <li>
              {user ? (
                <p className="text-teal-400 font-semibold">
                  Welcome, {user.username}!
                </p>
              ) : (
                <Link to="/signin" className="hover:text-teal-400 transition">
                  Sign In
                </Link>
              )}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <a href="#" className="text-xl hover:text-teal-400 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="text-xl hover:text-teal-400 transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-teal-400 transition">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} WatchMovies. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
