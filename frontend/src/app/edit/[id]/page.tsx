"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchHero, updateHero, deleteHero, uploadHeroImages, deleteHeroImage, Hero } from "../../../utils/api";
import Image from "next/image";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const heroId = params.id as string;

  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (heroId) {
      loadHero();
    }
  }, [heroId]);

  const loadHero = async () => {
    try {
      const heroData = await fetchHero(heroId);
      setHero(heroData);
      setNickname(heroData.nickname);
      setRealName(heroData.real_name);
      setOrigin(heroData.origin_description);
      setSuperpowers(heroData.superpowers);
      setCatchPhrase(heroData.catch_phrase);
    } catch (error) {
      console.error("Error loading hero:", error);
      alert("Failed to load hero");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hero) return;

    setSaving(true);
    try {
      // Оновлюємо дані героя
      await updateHero(heroId, {
        nickname,
        real_name: realName,
        origin_description: origin,
        superpowers,
        catch_phrase: catchPhrase,
      });

      // Завантажуємо нові зображення
      if (newImages.length > 0) {
        await uploadHeroImages(heroId, newImages);
      }

      alert("Hero updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error updating hero:", error);
      alert("Failed to update hero");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this hero?")) return;

    setDeleting(true);
    try {
      await deleteHero(heroId);
      alert("Hero deleted successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error deleting hero:", error);
      alert("Failed to delete hero");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteHeroImage(heroId, imageId);
      await loadHero(); // Перезавантажуємо дані
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete image");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2C275F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hero...</p>
        </div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hero not found</h1>
          <button
            onClick={() => router.push("/")}
            className="bg-[#2C275F] text-white px-6 py-2 rounded-lg hover:bg-[#1e1a4a] transition"
          >
            Back to Heroes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Edit Hero
          </h1>
          <p className="text-gray-600">
            Update {hero.nickname}'s information
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 p-8 space-y-8 shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#2C275F]">
                Hero Nickname *
              </label>
              <input
                type="text"
                placeholder="e.g., Superman, Spider-Man"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-400"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#2C275F]">
                Real Name
              </label>
              <input
                type="text"
                placeholder="e.g., Clark Kent, Peter Parker"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Origin Story
            </label>
            <textarea
              placeholder="Tell us about the hero's origin story..."
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none hover:border-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Superpowers
            </label>
            <textarea
              placeholder="Describe the hero's superpowers and abilities..."
              value={superpowers}
              onChange={(e) => setSuperpowers(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none hover:border-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Catch Phrase
            </label>
            <input
              type="text"
              placeholder="e.g., 'With great power comes great responsibility'"
              value={catchPhrase}
              onChange={(e) => setCatchPhrase(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 placeholder-gray-400 hover:border-gray-400"
            />
          </div>

          {/* Existing Images */}
          {hero.images.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-[#2C275F]">
                Current Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hero.images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="relative w-full h-32 rounded-lg overflow-hidden">
                      <Image
                        src={`http://localhost:5000${image.url}`}
                        alt={hero.nickname}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Images */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Add New Images
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#2C275F] file:text-white hover:file:bg-[#1e1a4a] hover:border-gray-400"
              />
            </div>
            {newImages.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-[#2C275F]">
                  {newImages.length} file(s) selected
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newImages.map((file, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#2C275F]/10 text-[#2C275F] text-xs rounded-full"
                    >
                      {file.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-[#2C275F] hover:bg-[#1e1a4a] text-white px-8 py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Updating Hero...</span>
                </>
              ) : (
                <span>Update Hero</span>
              )}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="px-8 py-4 rounded-lg font-semibold bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {deleting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Hero</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
