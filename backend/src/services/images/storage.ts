import range from 'lodash/range'
import { Image } from '../../interfaces'
import createImage from './create'

export default function imagesStorage() {
  const images: Image[] = []

  const getImage = (id: number) => images.find((image) => image.id === id)

  const addImage = (image: Image) => {
    images.push(image)
  }

  // Populate
  range(100).forEach(() => {
    const newImage = createImage(images.length + 1)
    addImage(newImage)
  })

  return {
    images,
    getImage,
    addImage
  }
}
