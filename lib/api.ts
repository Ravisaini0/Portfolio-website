export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://portfolio-website-backend-lzk3.onrender.com")

export function absoluteAssetUrl(url?: string | null) {
  if (!url) return ""
  if (url.startsWith("http") || url.startsWith("/images") || url.startsWith("/certificates")) {
    return url
  }
  if (!url.startsWith("/")) {
    return `${API_BASE_URL}/${url}`
  }
  return `${API_BASE_URL}${url}`
}
