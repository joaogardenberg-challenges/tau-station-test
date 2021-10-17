import { render } from '@testing-library/react'
import range from 'lodash/range'
import mapKeys from 'lodash/mapKeys'

const useHistory = jest.fn()
const useParams = jest.fn()
const useDispatch = jest.fn()
const useSelector = jest.fn()
const useQuery = jest.fn()
const fetchImages = jest.fn()

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory,
  useParams
}))

jest.doMock('react-redux', () => ({ useDispatch, useSelector }))
jest.doMock('hooks/useQuery', () => useQuery)
jest.doMock('actions', () => ({ fetchImages }))

const ImagesFetcher = require('./ImagesFetcher').default

const images = mapKeys(
  range(10, 21).map((id) => ({ id })),
  'id'
)

describe('Images Fetcher', () => {
  const queryToString = 'query'

  beforeEach(() => {
    useHistory.mockReturnValue({ replace: jest.fn() })
    useDispatch.mockReturnValue(jest.fn())
    useSelector.mockReturnValue(images)
    useQuery.mockReturnValue({
      get: () => '400',
      set: jest.fn(),
      toString: () => queryToString
    })
  })

  it('fetches the images until it reaches the current id', () => {
    useParams.mockReturnValue({ id: 5 })
    render(<ImagesFetcher />)

    expect(fetchImages).toHaveBeenCalledTimes(1)
    expect(fetchImages).toHaveBeenCalledWith({ fromId: 9, limit: 5 })
  })

  it('fetches the next images', () => {
    useParams.mockReturnValue({ id: 10 })
    render(<ImagesFetcher />)

    expect(fetchImages).toHaveBeenCalledTimes(1)
    expect(fetchImages).toHaveBeenCalledWith({ fromId: 9, limit: 0 })
  })

  it("redirects to the highest id when the image's id is higher", () => {
    useParams.mockReturnValue({ id: 21 })
    render(<ImagesFetcher />)

    expect(useHistory().replace).toHaveBeenCalledTimes(1)
    expect(useHistory().replace).toHaveBeenCalledWith({
      pathname: '/images/20',
      search: queryToString
    })
  })
})
