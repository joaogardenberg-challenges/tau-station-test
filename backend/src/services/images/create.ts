import random from 'lodash/random'
import faker from 'faker'
import { Image } from '../../types'

export default function createImage(id: number): Image {
  return {
    id,
    url: `https://picsum.photos/id/${id}`,
    heightRatio: random(0.1, 2.9),
    meta: {
      location: faker.address.city(),
      keywords: faker.lorem.words(random(2, 6)),
      datetime: faker.date.past()
    }
  }
}
