import { Image } from '../../types'

export default function sortImages(images: Image[]) {
  return images.sort(
    ({ id: firstId }: Image, { id: secondId }: Image) => secondId - firstId
  )
}
