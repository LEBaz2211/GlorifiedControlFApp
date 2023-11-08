// Import the search function from api.ts
import React, { useState } from "react";
import { search, SearchResult } from "../utils/api";

interface SearchBarProps {
  onSearchResults: (results: SearchResult[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState<string>("");
  const [filename, setFilename] = useState<string>("");

  // Event handler for form submission
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const results = await search(query, filename);
      onSearchResults(results); // Pass the results up to the parent component
      console.log(results);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter search term..."
      />
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Enter file name..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
