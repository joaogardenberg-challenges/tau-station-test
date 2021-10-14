import { Image, ParsedImage } from '../../types'

export const WIDTHS = [48, 400, 800, 1280]

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
