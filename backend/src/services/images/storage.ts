import range from 'lodash/range'
import { Image } from '../../interfaces'
import createImage from './create'

export const INITIAL_IMAGE_COUNT = 100

const INITIAL_IMAGES = range(INITIAL_IMAGE_COUNT).map((i) => createImage(i + 1))

export default function imagesStorage() {
  const images: Image[] = [...INITIAL_IMAGES]

  const getImage = (id: number) => images.find((image) => image.id === id)

  const addImage = (image: Image) => images.push(image)

  const resetImages = () => (images.length = INITIAL_IMAGE_COUNT)

  return {
    images,
    getImage,
    addImage,
    resetImages
  }
}
