import axios, { AxiosResponse } from 'axios';

// TypeScript interfaces for our data types
export interface SearchResult {
  id: string;
  text: string;
  pageNumber: number;
}

// Instantiate the axios with a configured instance
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add other default settings as needed
});

// Function to upload a file to the backend
export const uploadFile = (file: File): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Function to perform a search against the backend
export const search = (query: string, filename: string): Promise<SearchResult[]> => {
  return api.get<SearchResult[]>('/search', {
    params: { query , filename},
  })
  .then(response => response.data); // Unwrap the data from the response
};

// Exporting all functions
export default {
  uploadFile,
  search,
};