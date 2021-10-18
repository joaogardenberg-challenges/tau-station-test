import { render, screen } from '@testing-library/react'
import ThemeProvider from 'providers/Theme'

const useDispatch = jest.fn()
const useSelector = jest.fn()
const useMediaQuery = jest.fn()
const fetchImages = jest.fn()
const watchImages = jest.fn()

jest.doMock('react-redux', () => ({ useDispatch, useSelector }))
jest.doMock('@mui/material/useMediaQuery', () => useMediaQuery)
jest.doMock('actions', () => ({ fetchImages, watchImages }))

jest.mock('./ImageFiller')
jest.mock('./ImageCard')
jest.mock('./ImagesFetcher')

const ImagesList = require('./ImagesList').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Images List', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn())
    useSelector.mockReturnValue({ imageIds: [3, 2, 1], isFetching: false })
    useMediaQuery.mockReturnValue(true) // This means xl === true
  })

  it('renders successfully', () => {
    const { container } = renderWithTheme(<ImagesList />)

    const imageFillers = screen.getAllByTestId('image-filler')
    const imageCards = screen.getAllByTestId('image-card')
    const imagesFetcher = screen.getByTestId('images-fetcher')

    expect(imageFillers.length).toBe(2)
    expect(imageCards.length).toBe(3)
    expect(imagesFetcher).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('fetches and watches the images', () => {
    renderWithTheme(<ImagesList />)

    expect(fetchImages).toHaveBeenCalledTimes(1)
    expect(watchImages).toHaveBeenCalledTimes(1)
  })
})