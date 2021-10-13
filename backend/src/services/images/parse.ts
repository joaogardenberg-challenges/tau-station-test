import { Image } from '../../types'

const DEFAULT_WIDTH = 200

export default function parseImage(
  { id, url, heightRatio }: Image,
  width: number = DEFAULT_WIDTH
) {
  return { id, url: `${url}/${width}/${Math.floor(width * heightRatio)}` }
}
