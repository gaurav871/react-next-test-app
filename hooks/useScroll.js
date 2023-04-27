import axios from "axios"
import { useEffect, useState } from "react"
import encodeUrl from "../utils/encodeUrl"

export default function useScroll(initialPosts, query) {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const baseUrl = "/api/post"

  const fetchData = async () => {
    try {
      const url = encodeUrl(baseUrl, { ...query, page })
      const response = await axios.get(url)

      if (response.data.posts.length === 0) {
        setHasMore(false)
        return
      }
      setPosts([...posts, ...response.data.posts])
      setPage(page + 1)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (posts.length !== 0 && hasMore) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }

    if (posts.length === 0 && !hasMore) {
      setHasMore(false)
    }

    function handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const isAtBottom =
        Math.abs(window.innerHeight + scrollTop - offsetHeight) <= 1

      if (isAtBottom) {
        fetchData()
      }
    }
  }, [posts.length, hasMore])

  useEffect(() => {
    setHasMore(true)
    setPage(2)
    setPosts(initialPosts)
  }, [initialPosts])

  return { baseUrl, page, posts, setPosts, hasMore }
}
