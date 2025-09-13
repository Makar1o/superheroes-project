"use client";

import HeroCard from "../components/HeroCard";
import { useHeroes } from "../hooks/useHeroes";

export default function HomePage() {
  const { heroes, loading, page, total, nextPage, prevPage } = useHeroes();

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Superheroes</h2>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-[#2C275F] border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-2 text-gray-600">Loading...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {heroes.map((hero) => (
            <HeroCard
              key={hero.id}
              id={hero.id}
              nickname={hero.nickname}
              imageUrl={hero.images[0]?.url}
            />
          ))}
        </div>
      )}

      <div className="flex space-x-4 mt-6">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="px-4 py-2 bg-[#2C275F] text-white rounded-lg disabled:opacity-50 hover:bg-[#1e1a4a] transition"
        >
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={page * 5 >= total}
          className="px-4 py-2 bg-[#2C275F] text-white rounded-lg disabled:opacity-50 hover:bg-[#1e1a4a] transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
