import { expect } from 'chai'
import createImage from './create'
import imagesStorage, { INITIAL_IMAGE_COUNT } from './storage'

describe('Images Storage Service', () => {
  it('populates with initial images', () => {
    const { images } = imagesStorage()
    expect(images.length).to.equal(INITIAL_IMAGE_COUNT)
  })

  it('gets the right image', () => {
    const id = INITIAL_IMAGE_COUNT / 2
    const image = createImage(id)
    const { getImage } = imagesStorage()

    expect(getImage(id)).to.eql(image)
  })

  it('adds an image correctly', () => {
    const image = createImage(INITIAL_IMAGE_COUNT + 1)
    const { images, addImage } = imagesStorage()

    addImage(image)

    expect(images.length).to.equal(INITIAL_IMAGE_COUNT + 1)
    expect(images[images.length - 1]).to.eql(image)
  })

  it('resets the images correctly', () => {
    const { images, addImage, resetImages } = imagesStorage()

    addImage(createImage(INITIAL_IMAGE_COUNT + 1))
    expect(images.length).to.equal(INITIAL_IMAGE_COUNT + 1)

    resetImages()
    expect(images.length).to.equal(INITIAL_IMAGE_COUNT)
  })
})
