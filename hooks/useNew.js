import toast from "react-hot-toast"
import axios from "axios"

export default function useNew  (props)  {
  const {
    captionRef,
    topicsRef,
    imageFiles,
    setImageFiles,
    setLoading,
    maximumFile,
    setDisplayNew,
  } = props

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      if (!imageFiles.length) {
        toast.error("Please select one or more files")
        return
      }
      toast.loading("Posting...")
      setLoading(true)

      const { value: caption } = captionRef.current
      const { value: topics } = topicsRef.current
      const topicsArr = !topics.trim()
        ? []
        : topics.split(" ").join("").split(",")
      const base64Images = await Promise.all(
        imageFiles.map((image) => {
          return new Promise((resolve) => {
            let baseURL = ""
            let reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onload = () => {
              baseURL = reader.result
              resolve(baseURL)
            }
          })
        })
      )

      const postData = { caption, topics: topicsArr, images: base64Images }
      const response = await axios.post(`/api/post/`, postData)
      setLoading(false)
      toast.dismiss()
      const { success, message } = response.data
      if (success) {
        toast.success(message)

        captionRef.current.value = ""
        topicsRef.current.value = ""
        setImageFiles([])
        setDisplayNew(false)
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error("There was an error")
      console.error(error.message)
    }
    window.location.reload()
  }

  const handleAddImage = (e) => {
    const { files } = e.currentTarget
    const isOverMax = imageFiles.length + files.length > maximumFile
    if (isOverMax) {
      toast.error(`Maximum of ${maximumFile} images only`)
      return
    }
    setImageFiles([...imageFiles, ...files])
  }

  const handleRemoveImage = (index) => {
    const newImages = imageFiles.filter((image, i) => i !== index)
    setImageFiles([...newImages])
  }

  return { handleSubmit, handleAddImage, handleRemoveImage }
}

