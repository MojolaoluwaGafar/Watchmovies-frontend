import './App.css'
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TrendingMovies from "./components/TrendingMovies";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Watchlist from "./pages/Watchlist";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="bg-gray-900 text-white">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <TrendingMovies />
              <PopularMovies />
              <TopRatedMovies />
            </>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <Watchlist />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;