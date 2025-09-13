"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { createHero, uploadHeroImages } from "../utils/api";

interface HeroFormProps {
  onSubmitSuccess?: () => void;
}

export default function HeroForm({ onSubmitSuccess }: HeroFormProps) {
  const [nickname, setNickname] = useState("");
  const [realName, setRealName] = useState("");
  const [origin, setOrigin] = useState("");
  const [superpowers, setSuperpowers] = useState("");
  const [catchPhrase, setCatchPhrase] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const hero = await createHero({
        nickname,
        real_name: realName,
        origin_description: origin,
        superpowers,
        catch_phrase: catchPhrase,
      });

      if (images.length > 0) {
        await uploadHeroImages(hero.id, images);
      }

      alert("Hero created successfully!");
      onSubmitSuccess?.();

      setNickname("");
      setRealName("");
      setOrigin("");
      setSuperpowers("");
      setCatchPhrase("");
      setImages([]);
    } catch (err) {
      console.error("Error creating hero:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Unknown error occurred";
      alert(`Error creating hero: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create New Hero
          </h1>
          <p className="text-gray-600">
            Add a new superhero to your collection
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

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#2C275F]">
              Hero Images
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 focus:ring-2 focus:ring-[#2C275F] focus:border-[#2C275F] outline-none transition-all duration-200 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#2C275F] file:text-white hover:file:bg-[#2C275F]-hover hover:border-gray-400"
              />
            </div>
            {images.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-[#2C275F]">
                  {images.length} file(s) selected
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {images.map((file, index) => (
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
              disabled={loading}
              className="flex-1 bg-[#2C275F] hover:bg-[#2C275F]-hover text-white px-8 py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Hero...</span>
                </>
              ) : (
                <span>Create Hero</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setNickname("");
                setRealName("");
                setOrigin("");
                setSuperpowers("");
                setCatchPhrase("");
                setImages([]);
              }}
              className="px-8 py-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
