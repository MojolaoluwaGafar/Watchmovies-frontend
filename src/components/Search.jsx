import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TbWorldSearch } from "react-icons/tb";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  // ✅ Use useMemo instead of useCallback to persist the debounced function
  const debouncedSetQuery = useMemo(
    () => debounce((value) => setQuery(value), 300),
    []
  );

  return (
    <div className="py-10 text-center">
      <motion.h1
        className="text-5xl font-bold bg-gradient-to-r from-teal-200 to-teal-900 bg-clip-text text-transparent animate-pulse"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Want To <br /> Watch Movies?
      </motion.h1>

      <motion.form
        onSubmit={handleSearch}
        className="relative pt-5 w-full max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <input
          type="search"
          placeholder="Search for a movie to watch"
          onChange={(e) => debouncedSetQuery(e.target.value)}
          className="block border border-teal-200 w-full rounded-md py-2 pl-12 pr-4 text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-4 -translate-y-1 text-teal-400"
          aria-label="Search"
        >
          <TbWorldSearch size="24px" />
        </button>
      </motion.form>
    </div>
  );
}
