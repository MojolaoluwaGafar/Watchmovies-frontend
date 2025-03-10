import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="h-[80vh] flex flex-col justify-center items-center text-center bg-[url('/path-to-image.jpg')] bg-cover bg-center">
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-5xl font-bold text-white">
          Discover Your Next Favorite Movie
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Stream trending and top-rated movies now.
        </p>
        <div className="mt-6 flex justify-center">
          <Link to="/movies">
            <button className="bg-teal-400 text-black px-6 py-3 rounded-md hover:bg-teal-500">
              Browse Movies
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
