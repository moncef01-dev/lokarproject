export const getImageUrl = (path?: string): string => {
    if (!path) return "/placeholder-car.png";
    if (path.startsWith("http") || path.startsWith("data:")) return path;

    // If it's a placeholder or external URL, return as-is
    if (path.includes("placeholder") || path.includes("unsplash")) return path;

    // Ensure leading slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Resolve the backend root URL:
    // 1. Use VITE_BACKEND_URL if explicitly set
    // 2. Fall back to deriving it from VITE_API_URL by stripping /api
    // 3. Fall back to localhost:3000 in dev
    const BACKEND_URL =
        import.meta.env.MODE === "production"
            ? (import.meta.env.VITE_BACKEND_URL ||
               import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, "") ||
               "")
            : "http://localhost:3000";

    return `${BACKEND_URL}${cleanPath}`;
};

