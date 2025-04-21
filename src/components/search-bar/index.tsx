import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (query.trim()) {
      setIsLoading(true);
      await onSearch(query);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for media..."
        className="w-full px-4 py-2 border-1 text-white placeholder:text-white border-[#02F7FD]  focus:outline-none focus:ring-2 focus:ring-[#02F7FD] rounded-4xl"
      />
      {query && (
        <button
          onClick={handleReset}
          className="absolute right-5 top-1/4 transform -translate-y-1/2 text-[#02F7FD] hover:text-[#ffffff] text-2xl cursor-pointer"
        >
          &times;
        </button>
      )}
      <button
        onClick={handleSearch}
        className="mt-2 w-full bg-[#2372AB] text-white py-2 text-bold rounded hover:bg-[#02D6E0] transition flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loader border-t-transparent border-2 border-white rounded-full w-4 h-4 animate-spin"></span>
        ) : (
          "Search"
        )}
      </button>
    </div>
  );
}
