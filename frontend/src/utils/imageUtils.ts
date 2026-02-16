export const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder-car.png";
    if (path.startsWith("http") || path.startsWith("data:")) return path;

    // Remove leading slash if present to avoid double slashes with base URL
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Use environment variable or default to localhost:5000
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // If the path is already a full URL (e.g. from unsplash), just return it
    if (cleanPath.startsWith("/placeholder") || cleanPath.includes("unsplash")) return path;

    return `${API_URL}${cleanPath}`;
};
