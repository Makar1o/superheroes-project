import { useState, useEffect, useCallback } from "react";
import { fetchHeroes, Hero } from "../utils/api";

export function useHeroes(initialPage = 1, limit = 5) {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadHeroes = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchHeroes(page, limit);
      setHeroes(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error("Error loading heroes:", error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadHeroes();
  }, [loadHeroes]);

  const refetch = useCallback(() => {
    loadHeroes();
  }, [loadHeroes]);

  const nextPage = () => {
    if (page * limit < total) setPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return { heroes, page, total, limit, loading, nextPage, prevPage, refetch };
}
