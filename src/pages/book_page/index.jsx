import { useLocation, useParams } from "react-router-dom"
import { callBookById } from "../../services/api"
import BookDetail from "./BookDetail"
import { useEffect, useState } from "react"

const BookDetailScreen = () => {
  const location = useLocation()
  const id = location.search.slice(4)

  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchBookById = async () => {
    setLoading(true)
    const response = await callBookById(id)
    setData(response.data)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchBookById()
  }, [id])
  return (
    <>
      <BookDetail data={data} loading={loading} />
    </>
  )
}

export default BookDetailScreen;