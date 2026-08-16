// API Configuration
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_BASE_URL = BASE_URL;

// Helper function to construct API endpoints
export const getApiUrl = (path: string): string => {
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : "/" + path}`;
};

// Helper function to construct image URLs
export const getImageUrl = (imagePath: string): string => {
  if (imagePath.startsWith("http")) return imagePath;
  const cleanPath = imagePath.replace(/\\/g, "/");
  return `${BASE_URL}/${cleanPath}`;
};
