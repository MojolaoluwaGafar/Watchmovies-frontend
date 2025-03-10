const TrendingMovies = () => {
  // Sample movie data (replace with API data later)
  const movies = [
    { id: 1, title: "Movie 1", imageUrl: "/path-to-image1.jpg", rating: 8.5 },
    { id: 2, title: "Movie 2", imageUrl: "/path-to-image2.jpg", rating: 7.8 },
    { id: 3, title: "Movie 3", imageUrl: "/path-to-image3.jpg", rating: 9.0 },
  ];

  return (
    <section className="py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Trending Now</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-60 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white">
                {movie.title}
              </h3>
              <p className="text-yellow-400 text-sm mt-1">
                ⭐ {movie.rating}/10
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingMovies;
