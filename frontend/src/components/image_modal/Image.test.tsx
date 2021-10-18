import { render, screen } from '@testing-library/react'
import ThemeProvider from 'providers/Theme'

const useParams = jest.fn()
const useDispatch = jest.fn()
const useSelector = jest.fn()
const useQuery = jest.fn()
const selectImage = jest.fn()
const deselectImage = jest.fn()

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams
}))

jest.doMock('react-redux', () => ({ useDispatch, useSelector }))
jest.doMock('hooks/useQuery', () => useQuery)
jest.doMock('actions', () => ({ selectImage, deselectImage }))

const Image = require('./Image').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Image', () => {
  const image = {
    id: 1,
    urls: { 400: 'http://url400.com' },
    meta: { keywords: 'keywords' }
  }

  beforeEach(() => {
    useParams.mockReturnValue({ id: 1 })
    useDispatch.mockReturnValue(jest.fn())
    useSelector.mockReturnValue(image)
    useQuery.mockReturnValue({ get: () => '400', set: jest.fn() })
  })

  it('renders successfully', () => {
    const { container } = renderWithTheme(<Image />)
    expect(container).toMatchSnapshot()
  })

  it('has the right attributes', () => {
    renderWithTheme(<Image />)

    const link = screen.getByRole('link')
    const img = screen.getByTestId('image')

    expect(link).toHaveAttribute('href', image.urls[400])
    expect(img).toHaveAttribute('src', image.urls[400])
    expect(img).toHaveAttribute('alt', image.meta.keywords)
  })

  it('selects the current image', () => {
    const { rerender } = renderWithTheme(<Image />)

    expect(selectImage).toHaveBeenCalledTimes(1)
    expect(selectImage).toHaveBeenCalledWith(1)

    const newImage = { ...image, id: 2 }
    useSelector.mockReturnValue(newImage)

    rerender(<Image />)

    expect(selectImage).toHaveBeenCalledTimes(2)
    expect(selectImage).toHaveBeenCalledWith(2)
  })

  it('deselects the image on unmount', () => {
    const { unmount } = renderWithTheme(<Image />)
    expect(deselectImage).not.toHaveBeenCalled()

    unmount()
    expect(deselectImage).toHaveBeenCalledTimes(1)
  })
})
