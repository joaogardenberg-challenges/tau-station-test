import { Image } from '../../interfaces'

export default function parseImage(
  image: Image,
  width: number | string = 200,
  height: number | string = 200
) {
  return { ...image, url: `${image.url}/${width}/${height}` }
}
