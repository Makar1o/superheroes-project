"use client";

import HeroForm from "../../components/HeroForm";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  return (
    <div className="py-6">
      <HeroForm onSubmitSuccess={() => router.push("/")} />
    </div>
  );
}
