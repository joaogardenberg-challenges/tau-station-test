import { render } from '@testing-library/react'
import range from 'lodash/range'
import mapKeys from 'lodash/mapKeys'

const useState = jest.fn()
const useParams = jest.fn()
const useSelector = jest.fn()
const useQuery = jest.fn()

jest.doMock('react', () => ({ ...jest.requireActual('react'), useState }))
jest.doMock('react-router-dom', () => ({ useParams }))
jest.doMock('react-redux', () => ({ useSelector }))
jest.doMock('hooks/useQuery', () => useQuery)

const { default: ImagesPreloader, IDS_RANGE } = require('./ImagesPreloader')

describe('Images Preloader', () => {
  const images = mapKeys(
    range(1, 41).map((id) => ({
      id,
      urls: {
        48: `${id}-48`,
        400: `${id}-400`,
        800: `${id}-800`,
        1280: `${id}-1280`
      }
    })),
    'id'
  )

  beforeEach(() => {
    useState.mockReturnValue([[], jest.fn()])
    useSelector.mockReturnValue(images)
    useQuery.mockReturnValue({ get: () => '400' })
  })

  it('preloads the images around the current one', () => {
    const id = 20
    useParams.mockReturnValue({ id })

    render(<ImagesPreloader />)

    expect(useState()[1]).toHaveBeenCalledTimes(25)

    range(4).forEach((i) =>
      expect(useState()[1]).toHaveBeenNthCalledWith(i + 1, [
        Object.values(images[id].urls)[i]
      ])
    )

    range(-IDS_RANGE, IDS_RANGE + 1).forEach((i) =>
      expect(useState()[1]).toHaveBeenNthCalledWith(i + IDS_RANGE + 5, [
        images[id + i].urls[400]
      ])
    )
  })
})
