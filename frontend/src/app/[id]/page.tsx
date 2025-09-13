"use client";

import { useEffect, useState } from "react";
import HeroDetails from "../../components/HeroDetails";
import { fetchHero, Hero } from "../../utils/api";

interface Props {
  params: { id: string };
}

export default function HeroPage({ params }: Props) {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        const data = await fetchHero(params.id);
        setHero(data);
      } catch (err) {
        console.error("Error loading hero:", err);
        setError("Failed to load hero");
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-4 border-[#2C275F] border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-6">{error}</p>;
  }

  if (!hero) {
    return <p className="text-gray-600 text-center mt-6">Hero not found</p>;
  }

  return <HeroDetails {...hero} />;
}
