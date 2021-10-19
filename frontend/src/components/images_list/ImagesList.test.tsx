import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeProvider from 'providers/Theme'

const useDispatch = jest.fn()
const useSelector = jest.fn()
const useMediaQuery = jest.fn()
const fetchImages = jest.fn()
const watchImages = jest.fn()
const stopWatchingImages = jest.fn()

jest.doMock('react-redux', () => ({ useDispatch, useSelector }))
jest.doMock('@mui/material/useMediaQuery', () => useMediaQuery)
jest.doMock('actions', () => ({ fetchImages, watchImages, stopWatchingImages }))

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

  it('renders the images successfully', () => {
    const { container } = renderWithTheme(<ImagesList />)

    const imageFillers = screen.getAllByTestId('image-filler')
    const imageCards = screen.getAllByTestId('image-card')
    const imagesFetcher = screen.getByTestId('images-fetcher')

    expect(imageFillers.length).toBe(2)
    expect(imageCards.length).toBe(3)
    expect(imagesFetcher).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders loading successfully', () => {
    useSelector.mockReturnValue({ imageIds: [], isFetching: true })
    const { container } = renderWithTheme(<ImagesList />)

    const spinner = screen.getByRole('progressbar')

    expect(spinner).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders error successfully', () => {
    useSelector.mockReturnValue({ imageIds: [], isFetching: false })
    const { container } = renderWithTheme(<ImagesList />)

    const retry = screen.getByRole('button')
    userEvent.click(retry)

    expect(stopWatchingImages).toHaveBeenCalledTimes(2)
    expect(fetchImages).toHaveBeenCalledTimes(2)
    expect(watchImages).toHaveBeenCalledTimes(2)
    expect(container).toMatchSnapshot()
  })

  it('fetches and watches the images', () => {
    renderWithTheme(<ImagesList />)

    expect(stopWatchingImages).toHaveBeenCalledTimes(1)
    expect(fetchImages).toHaveBeenCalledTimes(1)
    expect(watchImages).toHaveBeenCalledTimes(1)
  })
})
