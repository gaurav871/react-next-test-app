export default function getApiUrl() {
  const url = {
    development: "http://localhost:3000",
  }

  const env = "development"

  return url[env]
}
