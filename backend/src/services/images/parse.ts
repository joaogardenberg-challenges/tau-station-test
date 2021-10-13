import { Image } from '../../types'

export const DEFAULT_SIZE = 200

export default function parseImage(
  image: Image,
  width: number | string = DEFAULT_SIZE,
  height: number | string = DEFAULT_SIZE
) {
  return { ...image, url: `${image.url}/${width}/${height}` }
}
