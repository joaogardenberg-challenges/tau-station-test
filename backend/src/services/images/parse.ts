import { Image, ParsedImage } from '../../types'
import { WIDTHS } from '../../config/constants'

export default function parseImage({
  id,
  url,
  heightRatio,
  meta
}: Image): ParsedImage {
  return {
    id,
    urls: WIDTHS.reduce(
      (acc, width) => ({
        ...acc,
        [width]: `${url}/${width}/${Math.floor(width * heightRatio)}`
      }),
      {}
    ),
    meta
  }
}
