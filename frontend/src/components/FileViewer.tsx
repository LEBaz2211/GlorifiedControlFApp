import React from "react";

// Updated FileViewer.tsx

interface SearchResult {
  filename: string;
  page: number;
}

interface Props {
  searchResults: SearchResult[];
}

const FileViewer: React.FC<Props> = ({ searchResults }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result, index) => {
          return (
            <li key={`${result.filename}_${result.page}`}>
              File: {result.filename.replace(/_/g, " ")}, Page: {result.page}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileViewer;
