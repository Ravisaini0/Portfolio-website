export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://localhost:8081"
    : "https://portfolio-website-backend-lzk3.onrender.com")

export function absoluteAssetUrl(url?: string | null) {
  const value = url?.trim()
  if (!value) return ""

  const normalized = value.replaceAll("\\", "/")
  const uploadIndex = normalized.indexOf("/uploads/")
  const assetPath = uploadIndex >= 0 ? normalized.slice(uploadIndex) : normalized

  if (assetPath.startsWith("http") || assetPath.startsWith("/images") || assetPath.startsWith("/certificates")) {
    return assetPath
  }
  if (!assetPath.startsWith("/")) {
    return `${API_BASE_URL}/${assetPath}`
  }
  return `${API_BASE_URL}${assetPath}`
}
