import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbWorldSearch } from "react-icons/tb";

export default function Search() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Navigate to SearchResults page with the query in the URL
    navigate(`/search-results?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="py-10">
      <h1 className="text-center text-5xl bg-gradient-to-r from-teal-200 to-teal-900 bg-clip-text text-transparent font-bold animate-pulse">
        Want To <br /> Watch Movies?
      </h1>
      <form
        onSubmit={handleSearch}
        className="relative pt-5 w-full max-w-md mx-auto"
      >
        <input
          type="search"
          placeholder="Search for a movie to watch"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block border border-teal-200 w-full rounded-md py-2 pl-12 pr-4 text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-4 -translate-y-1 text-teal-400"
        >
          <TbWorldSearch size="24px" />
        </button>
      </form>
    </div>
  );
}
