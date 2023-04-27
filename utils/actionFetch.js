import axios from "axios"
import encodeUrl from "./encodeUrl"

export default async function actionFetch(baseUrl, query, page) {
  try {
    const url = encodeUrl(baseUrl, { ...query, page, noSkip: true })
    const response = await axios.get(url)
    return response.data.posts
  } catch (error) {
    console.error(error)
  }
}
