export const getImageUrl = (path?: string) => {
    if (!path) return "/placeholder-car.png";
    if (path.startsWith("http") || path.startsWith("data:")) return path;

    // Remove leading slash if present to avoid double slashes with base URL
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Use VITE_BACKEND_URL (root server, no /api) for static assets like /uploads/
    // Falls back to localhost:3000 in development
    const BACKEND_URL =
        import.meta.env.MODE === "production"
            ? import.meta.env.VITE_BACKEND_URL
            : "http://localhost:3000";

    // If the path is already a full URL (e.g. from unsplash), just return it
    if (cleanPath.startsWith("/placeholder") || cleanPath.includes("unsplash")) return path;

    return `${BACKEND_URL}${cleanPath}`;
};
