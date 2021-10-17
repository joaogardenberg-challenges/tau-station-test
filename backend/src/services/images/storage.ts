import range from 'lodash/range'
import { Image, ImagesStorage } from '../../types'
import createImage from './create'

export const INITIAL_IMAGE_COUNT = 100

const INITIAL_IMAGES = range(1, INITIAL_IMAGE_COUNT + 1).map(createImage)

export default function imagesStorage(): ImagesStorage {
  const images: Image[] = [...INITIAL_IMAGES]

  const getImage = (id: number): Image | undefined =>
    images.find((image) => image.id === id)

  const addImage = (image: Image) => images.push(image)

  const resetImages = () => images.splice(0, images.length, ...INITIAL_IMAGES)

  return {
    images,
    getImage,
    addImage,
    resetImages
  }
}
