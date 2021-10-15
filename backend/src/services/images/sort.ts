import { Image } from '../../types'

export const sortIdDesc = ({ id: firstId }: Image, { id: secondId }: Image) =>
  secondId - firstId
