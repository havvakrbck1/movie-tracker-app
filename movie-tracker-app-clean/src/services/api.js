// src/services/api.js

const API_KEY = "9660ffb0d96cc0a3973ddaee8e1765a6";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
};

// 🔥 Eksik olan buydu:
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1`);
  const data = await res.json();
  return data.results;
};
