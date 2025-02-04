const HeroSection = () => {
  return (
    <section className="h-[80vh] flex flex-col justify-center items-center text-center bg-[url('/path-to-image.jpg')] bg-cover bg-center">
      <div className="bg-black bg-opacity-50 p-6 rounded-lg">
        <h1 className="text-5xl font-bold">
          Discover Your Next Favorite Movie
        </h1>
        <p className="mt-4 text-lg">
          Stream trending and top-rated movies now.
        </p>
        <div className="mt-6 flex gap-4">
          <button className="bg-teal-400 text-black px-6 py-3 rounded-md">
            Browse Movies
          </button>
          <button className="border border-white px-6 py-3 rounded-md">
            Watchlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
