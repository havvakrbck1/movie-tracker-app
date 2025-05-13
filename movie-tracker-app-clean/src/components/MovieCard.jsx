import React from 'react';

export default function MovieCard({ movie, onAddFavorite, onMarkWatched, onMarkToWatch }) {
  return (
    <div className="bg-white rounded-2xl shadow hover:scale-[1.02] transition-all overflow-hidden">
      <img src={movie.poster} alt={movie.title} className="w-full h-80 object-cover"/>
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{movie.title}</h2>
        <p className="text-yellow-600 font-bold">⭐ {movie.rating}</p>
        <div className="flex gap-2">
          <button
            className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
            onClick={() => onAddFavorite(movie)}
          >
            ❤️
          </button>
          <button
            className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
            onClick={() => onMarkWatched(movie)}
          >
            ✅ İzledim
          </button>
          <button
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            onClick={() => onMarkToWatch(movie)}
          >
            🔜 İzleyeceğim
          </button>
        </div>
      </div>
    </div>
  );
}
