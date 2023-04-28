export default function getApiUrl() {
  const url = {
    development: "http://localhost:3000",
    production: "https://charming-taiyaki-9a13b8.netlify.app",
  }

  const env = process.env.NODE_ENV || "development"

  return url[env]
}
