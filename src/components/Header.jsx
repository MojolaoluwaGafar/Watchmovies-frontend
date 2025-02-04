import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          WatchNow
        </Link>
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
        <Link
          to="/signin"
          className="border px-4 py-2 rounded-md hover:bg-teal-400 hover:text-black"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
