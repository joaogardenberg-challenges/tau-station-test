import random from 'lodash/random'

export default function createImage(id: number) {
  return {
    id,
    url: `https://picsum.photos/id/${id}`,
    heightRatio: random(0.1, 2.9)
  }
}
