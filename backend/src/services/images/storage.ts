import range from 'lodash/range'
import { Image } from '../../interfaces'
import createImage from './create'

const INITIAL_IMAGE_COUNT = 100

export default function imagesStorage() {
  const images: Image[] = []

  const getImage = (id: number) => images.find((image) => image.id === id)

  const addImage = (image: Image) => {
    images.push(image)
  }

  const resetImages = () => {
    if (images.length) {
      images.length = INITIAL_IMAGE_COUNT
    }
  }

  range(INITIAL_IMAGE_COUNT).forEach(() => {
    const newImage = createImage(images.length + 1)
    addImage(newImage)
  })

  return {
    images,
    getImage,
    addImage,
    resetImages
  }
}
