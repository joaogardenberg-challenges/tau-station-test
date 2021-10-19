import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import { fetchImages } from 'actions'
import { getSortedImageIds, isFetchingImages } from 'selectors'
import { StoreState } from 'types'
import useQuery from 'hooks/useQuery'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'

export default function ImagesFetcher() {
  const dispatch = useDispatch()
  const history = useHistory()
  const query = useQuery()
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)

  const { imageIds, isFetching } = useSelector((s: StoreState) => ({
    imageIds: getSortedImageIds(s),
    isFetching: isFetchingImages(s)
  }))

  const lastImageId = Math.min(...imageIds)
  const firstImageId = Math.max(...imageIds)

  useEffect(() => {
    if (id && lastImageId && imageIds.length && id <= lastImageId) {
      dispatch(
        fetchImages({ fromId: lastImageId - 1, limit: lastImageId - id })
      )
    }
  }, [id, lastImageId])

  useEffect(() => {
    if (id && firstImageId && imageIds.length && id > firstImageId) {
      history.replace({
        pathname: `/images/${firstImageId}`,
        search: query.toString()
      })
    }
  }, [id, firstImageId])

  useDidUpdateEffect(() => {
    if (isEmpty(imageIds) && !isFetching) {
      history.push('/images')
    }
  }, [imageIds, isFetching])

  return null
}
