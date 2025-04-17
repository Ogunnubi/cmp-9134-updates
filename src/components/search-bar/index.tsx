import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Search media..."
        className="border px-4 py-2 rounded w-full bg-[#2E3E54] placeholder:text-[white] text-[white] cursor-pointer outline-0"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="bg-[#5B769C] text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
