import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import PrivateRoute from "./components/PrivateRoute";
import MovieDetails from "./components/Movie/MovieDetails";
import WatchPage from "./pages/WatchPage";
import TrendingMovies from "./components/TrendingMovies";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import SearchResults from "./pages/SearchResults";
import MoviesPage from "./pages/MoviesPage"


function App() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route path="/trending" element={<TrendingMovies />} />
          <Route path="/popular" element={<PopularMovies />} />
          <Route path="/top-rated" element={<TopRatedMovies />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/movies" element={<MoviesPage />}  />
          <Route
            path="/watchlist"
            element={
              <PrivateRoute>
                <Watchlist />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
