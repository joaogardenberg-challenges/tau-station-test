import { expect } from 'chai'
import createImage from './create'
import parseImage, { WIDTHS } from './parse'

describe('Parse Image Service', () => {
  it('parses the image correctly', () => {
    const image = createImage(123)
    const parsedImage = parseImage(image)

    expect(Object.keys(parsedImage.urls).length).to.equal(WIDTHS.length)

    Object.entries(parsedImage.urls).forEach(([width, url]) => {
      const height = Math.floor(parseInt(width, 10) * image.heightRatio)
      expect(url).to.contain(width)
      expect(url).to.contain(height)
    })
  })
})
