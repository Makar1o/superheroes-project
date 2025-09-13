"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteHero } from "../utils/api";

interface HeroImage {
  id: string;
  url: string;
}

interface HeroDetailsProps {
  id: string;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
  images: HeroImage[];
}

export default function HeroDetails({
  id,
  nickname,
  real_name,
  origin_description,
  superpowers,
  catch_phrase,
  images,
}: HeroDetailsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${nickname}?`)) return;

    setIsDeleting(true);
    try {
      await deleteHero(id);
      router.push("/"); // після видалення повертаємось на список
    } catch (error) {
      console.error("Error deleting hero:", error);
      alert("Failed to delete hero");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => {
    router.push(`/edit/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">{nickname}</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="bg-[#2C275F] text-white px-4 py-2 rounded-lg hover:bg-[#1e1a4a] transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 transition"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      <p className="text-gray-600 italic">{catch_phrase}</p>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Real Name:</span> {real_name}
        </p>
        <p>
          <span className="font-semibold">Origin:</span> {origin_description}
        </p>
        <p>
          <span className="font-semibold">Superpowers:</span> {superpowers}
        </p>
      </div>

      {images.length > 0 && (
        <div className="flex space-x-4 overflow-x-auto py-2">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative w-64 h-40 flex-shrink-0 rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={`http://localhost:5000${img.url}`}
                alt={nickname}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
