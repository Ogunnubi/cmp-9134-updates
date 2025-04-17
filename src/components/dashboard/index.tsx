"use client";
import { useEffect, useState } from "react";
import SearchBar from "@/components/search-bar";
import { searchMedia } from "@/utils/api";

export default function DashBoard() {
  const [images, setImages] = useState([]);
  const [audio, setAudio] = useState([]);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("mediaSearchHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const updateHistory = (query: string) => {
    const newHistory = [
      query,
      ...history.filter((item) => item !== query),
    ].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("mediaSearchHistory", JSON.stringify(newHistory));
  };
  const handleSearch = async (query: string) => {
    const results = await searchMedia(query);
    setImages(results.images);
    setAudio(results.audio);
    updateHistory(query);
  };
  const handleDeleteHistory = (query: string) => {
    const updated = history.filter((item) => item !== query);
    setHistory(updated);
    localStorage.setItem("mediaSearchHistory", JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("mediaSearchHistory");
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Open License Media Search
      </h1>
      <SearchBar onSearch={handleSearch} />

      {/* Search History */}
      {history.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-white">
            Search History
          </h2>
          <div className="flex flex-wrap gap-2">
            {history.map((term) => (
              <div
                key={term}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full"
              >
                <button onClick={() => handleSearch(term)}>{term}</button>
                <button
                  onClick={() => handleDeleteHistory(term)}
                  className="ml-2 text-red-600 hover:text-red-800 cursor-pointer font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={clearAllHistory}
            className="mt-2 text-md text-[#02F7FD] underline cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-white">Images</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border rounded shadow hover:shadow-lg transition bg-[#2E3E54] p-4">
          {images.length > 0 ? (
            images.map((media: any) => (
              <div
                key={media.id}
                className="border border-[white] rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={media.thumbnail}
                  alt={media.title}
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="p-2">
                  <p className="font-semibold text-white text-sm sm:text-base">
                    {media.title || "Untitled"}
                  </p>
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm underline text-white"
                  >
                    View Source
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No images found.</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2 text-white">Audio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 border rounded shadow hover:shadow-lg transition align-center p-4 bg-[#2E3E54]">
          {audio.length > 0 ? (
            audio.map((track: any) => (
              <div key={track.id} className="text-center">
                <p className="font-medium text-white text-sm sm:text-base">
                  {track.title}
                </p>
                <audio controls src={track.url} className="w-full"></audio>
              </div>
            ))
          ) : (
            <p className="text-white">No audio found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
