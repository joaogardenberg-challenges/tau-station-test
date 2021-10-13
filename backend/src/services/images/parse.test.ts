import { expect } from 'chai'
import createImage from './create'
import parseImage, { DEFAULT_SIZE } from './parse'

describe('Parse Image Service', () => {
  it('parses the image with default width and height', () => {
    const image = createImage(123)
    const parsedImage = parseImage(image)
    expect(parsedImage.url).to.contain(`${DEFAULT_SIZE}/${DEFAULT_SIZE}`)
  })

  it('parses the image with custom width and height', () => {
    const image = createImage(123)
    const parsedImage = parseImage(image, 123, 234)
    expect(parsedImage.url).to.contain(`123/234`)
  })
})
