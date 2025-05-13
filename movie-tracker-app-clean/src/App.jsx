import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./services/api";

function App() {
  const [movies, setMovies] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [toWatch, setToWatch] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const storedWatched = JSON.parse(localStorage.getItem("watched")) || [];
    const storedToWatch = JSON.parse(localStorage.getItem("toWatch")) || [];
    
    setFavorites(storedFavorites);
    setWatched(storedWatched);
    setToWatch(storedToWatch);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("watched", JSON.stringify(watched));
    localStorage.setItem("toWatch", JSON.stringify(toWatch));
  }, [favorites, watched, toWatch]);

  useEffect(() => {
    const fetchData = async () => {
      const popular = await getPopularMovies();
      setMovies(popular);
    };
    fetchData();
  }, []);

  const handleSearch = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    
    if (query.length > 2) {
      const results = await searchMovies(query);
      setMovies(results);
    } else {
      const popular = await getPopularMovies();
      setMovies(popular);
    }
  };

  const handleRandomMovie = () => {
    if (movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setRandomMovie(movies[randomIndex]);
    }
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some((fav) => fav.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  const handleWatched = (movie) => {
    if (!watched.some((m) => m.id === movie.id)) {
      setWatched([...watched, movie]);
      setToWatch(toWatch.filter((m) => m.id !== movie.id));
    }
  };

  const handleToWatch = (movie) => {
    if (!toWatch.some((m) => m.id === movie.id)) {
      setToWatch([...toWatch, movie]);
      setWatched(watched.filter((m) => m.id !== movie.id));
    }
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">🎬 Popüler Filmler</h1>

      {/* Arama kutusu */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Film Ara..."
        className="w-full md:w-1/3 p-3 mb-6 bg-gray-800 text-white rounded-lg"
      />

      <button
        onClick={handleRandomMovie}
        className="mb-6 bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg"
      >
        Bugün ne izlesem?
      </button>

      {randomMovie && (
        <div className="mb-10 p-4 bg-gray-800 rounded-xl">
          <h2 className="text-2xl font-bold mb-2 text-pink-400">
            🎲 Önerilen Film:
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="w-40 rounded-lg"
            />
            <div>
              <h3 className="text-xl font-semibold">{randomMovie.title}</h3>
              <p className="text-gray-400">{randomMovie.overview}</p>
              <p className="text-sm text-gray-500 mt-2">
                Yayın tarihi: {randomMovie.release_date}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-sm text-gray-400">{movie.release_date}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`px-2 py-1 rounded ${
                    isFavorite(movie.id)
                      ? "bg-yellow-500 text-black"
                      : "bg-gray-600 text-white"
                  }`}
                >
                  {isFavorite(movie.id) ? "Favoriden Çıkar" : "Favorilere Ekle"}
                </button>
                <button
                  onClick={() => handleWatched(movie)}
                  className="px-2 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  İzledim
                </button>
                <button
                  onClick={() => handleToWatch(movie)}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  İzleyeceğim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* İzlediklerim */}
      <h2 className="text-2xl mt-10 mb-4 font-bold text-green-400">🎬 İzlediklerim</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {watched.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-700 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* İzleyeceklerim */}
      <h2 className="text-2xl mt-10 mb-4 font-bold text-blue-400">🎬 İzleyeceklerim</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {toWatch.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-700 rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-2">
              <h2 className="text-lg font-semibold">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
