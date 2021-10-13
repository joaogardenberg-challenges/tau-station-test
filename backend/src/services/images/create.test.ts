import { expect } from 'chai'
import createImage from './create'

describe('Create Image Service', () => {
  it('creates a correct image', () => {
    const id = 123
    const image = createImage(id)

    expect(image.id).to.equal(id)
    expect(image.url).to.contain(id)
  })
})
