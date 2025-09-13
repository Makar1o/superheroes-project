export interface Hero {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: { id: string; url: string; filename: string }[];
  createdAt: string;
  updatedAt?: string;
}

export interface PaginatedHeroes {
  items: Hero[];
  total: number;
  page: number;
  limit: number;
}

const API_BASE = "http://localhost:5000";

export async function fetchHeroes(
  page = 1,
  limit = 5
): Promise<PaginatedHeroes> {
  const res = await fetch(`${API_BASE}/heroes?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch heroes");
  return res.json();
}

export async function fetchHero(id: string): Promise<Hero> {
  const res = await fetch(`${API_BASE}/heroes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch hero");
  return res.json();
}

export async function createHero(heroData: {
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
}): Promise<Hero> {
  const res = await fetch(`${API_BASE}/heroes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(heroData),
  });
  if (!res.ok) throw new Error("Failed to create hero");
  return res.json();
}

export async function updateHero(
  id: string,
  heroData: {
    nickname: string;
    real_name: string;
    origin_description: string;
    superpowers: string;
    catch_phrase: string;
  }
): Promise<Hero> {
  const res = await fetch(`${API_BASE}/heroes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(heroData),
  });
  if (!res.ok) throw new Error("Failed to update hero");
  return res.json();
}

export async function deleteHero(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/heroes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete hero");
}

export async function uploadHeroImages(
  heroId: string,
  files: File[]
): Promise<{ id: string; url: string; filename: string }[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  const res = await fetch(`${API_BASE}/heroes/${heroId}/images`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload images");
  return res.json();
}

export async function deleteHeroImage(
  heroId: string,
  imageId: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/heroes/${heroId}/images/${imageId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete image");
}
