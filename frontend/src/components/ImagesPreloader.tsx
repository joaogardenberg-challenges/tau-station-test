import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import range from 'lodash/range'
import { getImagesList } from 'selectors'
import useQuery from 'hooks/useQuery'
import { ImagesList } from 'types'

const IDS_RANGE = 10

export default function ImagesPreloader() {
  const params: { id: string } = useParams()
  const id = parseInt(params.id, 10)
  const images: ImagesList = useSelector(getImagesList)
  const width = parseInt(useQuery().get('width') || '', 10)
  const [preloadedImages, setPreloadedImages] = useState<string[]>([])

  const preloadImage = (url: string) => {
    if (!preloadedImages.includes(url)) {
      new Image().src = url
      setPreloadedImages([...preloadedImages, url])
    }
  }

  useEffect(() => {
    Object.values(images[id]?.urls || []).forEach(preloadImage)

    range(id - IDS_RANGE, id + IDS_RANGE).forEach((imageId) => {
      const image = images[imageId]

      if (image?.urls) {
        preloadImage(image.urls[width])
      }
    })
  }, [images, id, width])

  return null
}
