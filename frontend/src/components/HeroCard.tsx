import Image from "next/image";
import Link from "next/link";

interface HeroCardProps {
  id: string;
  nickname: string;
  imageUrl?: string;
}

export default function HeroCard({ id, nickname, imageUrl }: HeroCardProps) {
  const fullImageUrl = imageUrl ? `http://localhost:5000${imageUrl}` : null;

  return (
    <div className="w-full md:w-64 bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <Link href={`/${id}`} className="block group">
        <div className="relative w-full h-60 overflow-hidden">
          {fullImageUrl ? (
            <Image
              src={fullImageUrl}
              alt={nickname}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col justify-center">
          <h3 className="text-lg font-semibold text-gray-800">{nickname}</h3>
          <p className="text-sm text-gray-500 mt-2">Click to view details</p>
        </div>
      </Link>
    </div>
  );
}
