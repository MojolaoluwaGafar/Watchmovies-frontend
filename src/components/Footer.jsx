import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-teal-400 text-2xl font-bold">WatchNow</h2>
          <p className="mt-2 text-sm">
            Your go-to platform for discovering and streaming top movies.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link to="/trending" className="hover:text-teal-400">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/popular" className="hover:text-teal-400">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/top-rated" className="hover:text-teal-400">
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="/signin" className="hover:text-teal-400">
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-white text-lg font-semibold">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-3">
            <a href="#" className="hover:text-teal-400">
              Facebook
            </a>
            <a href="#" className="hover:text-teal-400">
              Twitter
            </a>
            <a href="#" className="hover:text-teal-400">
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} WatchNow. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
