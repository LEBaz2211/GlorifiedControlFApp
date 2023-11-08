// Update the App component to manage search results state
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import SearchBar from "./components/SearchBar";
import FileViewer from "./components/FileViewer";
import { SearchResult } from "./utils/api";
import "./App.css";

const App: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Function to update the search results state
  const handleSearchResults = (results: SearchResult[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Glorified Ctrl+F Application</h1>
      <FileUpload />
      <SearchBar onSearchResults={handleSearchResults} />
      <FileViewer searchResults={searchResults} />
    </div>
  );
};

export default App;
