import { expect } from 'chai'
import createImage from './create'
import parseImage, { DEFAULT_WIDTH } from './parse'

describe('Parse Image Service', () => {
  it('parses the image with default width', () => {
    const image = createImage(123)
    const height = Math.floor(DEFAULT_WIDTH * image.heightRatio)
    const parsedImage = parseImage(image)

    expect(parsedImage.url).to.contain(`${DEFAULT_WIDTH}/${height}`)
  })

  it('parses the image with custom width and height', () => {
    const image = createImage(123)
    const width = 456
    const height = Math.floor(width * image.heightRatio)
    const parsedImage = parseImage(image, width)

    expect(parsedImage.url).to.contain(`${width}/${height}`)
  })
})
