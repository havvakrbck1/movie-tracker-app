
import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">🎬 Movie Tracker</h1>
      <div className="space-x-4">
        <button className="hover:underline">Anasayfa</button>
        <button className="hover:underline">Favorilerim</button>
        <button className="hover:underline">Bugün Ne İzlesem?</button>
      </div>
    </nav>
  );
}
