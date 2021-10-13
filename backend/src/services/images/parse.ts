import { Image } from '../../types'

export const DEFAULT_WIDTH = 200

export default function parseImage(
  { id, url, heightRatio, meta }: Image,
  width: number = DEFAULT_WIDTH
) {
  return {
    id,
    url: `${url}/${width}/${Math.floor(width * heightRatio)}`,
    meta
  }
}
