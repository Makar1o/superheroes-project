import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#2C275F] text-white p-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <h1 className="text-2xl font-bold">Superheroes DB</h1>
      </Link>
      <Link href="/create">
        <button className="bg-white text-[#2C275F] px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Create
        </button>
      </Link>
    </header>
  );
}
