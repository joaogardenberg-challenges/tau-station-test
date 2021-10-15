import { fetchImages } from 'actions'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getImagesList } from 'selectors'
import { ImagesList } from 'types'
import useQuery from 'hooks/useQuery'

export default function ImagesFetcher() {
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)
  const images: ImagesList = useSelector(getImagesList)

  const imagesIds = Object.keys(images).map((stringId) =>
    parseInt(stringId, 10)
  )

  const lastImageId = Math.min(...imagesIds)
  const firstImageId = Math.max(...imagesIds)

  useEffect(() => {
    if (id && lastImageId && Object.keys(images).length && id <= lastImageId) {
      dispatch(
        fetchImages({ fromId: lastImageId - 1, limit: lastImageId - id })
      )
    }
  }, [id, lastImageId])

  useEffect(() => {
    if (id && firstImageId && Object.keys(images).length && id > firstImageId) {
      history.replace({
        pathname: `/images/${firstImageId}`,
        search: query.toString()
      })
    }
  }, [id, firstImageId])

  return null
}
