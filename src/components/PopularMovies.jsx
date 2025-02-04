const PopularMovies = () => {
  const movies = [
    { id: 1, title: "Popular Movie 1", image: "/path-to-image1.jpg" },
    { id: 2, title: "Popular Movie 2", image: "/path-to-image2.jpg" },
    { id: 3, title: "Popular Movie 3", image: "/path-to-image3.jpg" },
  ];

  return (
    <section className="py-10 px-4 bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-6">Popular Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <h3 className="text-lg font-semibold p-4">{movie.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularMovies;
