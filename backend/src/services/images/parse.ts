import { Image } from '../../interfaces'

export default function parseImage(
  image: Image,
  width: number = 200,
  height: number = 200
) {
  return { ...image, url: `${image.url}/${width}/${height}` }
}
