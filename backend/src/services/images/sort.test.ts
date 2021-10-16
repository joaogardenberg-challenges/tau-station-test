import { expect } from 'chai'
import sortImages from './sort'
import imagesStorage from './storage'

describe('Sort Images Service', () => {
  it('sorts the images correctly', () => {
    const { images } = imagesStorage()
    const sortedImages = sortImages(images)
    const imageIds = images.map(({ id }) => id)

    expect(sortedImages.length).to.equal(images.length)
    expect(sortedImages[0].id).to.equal(Math.max(...imageIds))
    expect(sortedImages[sortedImages.length - 1].id).to.equal(
      Math.min(...imageIds)
    )
  })
})
