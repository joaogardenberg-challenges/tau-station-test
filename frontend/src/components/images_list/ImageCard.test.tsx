import { render } from '@testing-library/react'
import Providers from 'providers'

const useSelector = jest.fn()
const useOnScreen = jest.fn()
const scrollIntoView = jest.fn()

jest.doMock('react-redux', () => ({ useSelector }))
jest.doMock('hooks/useOnScreen', () => useOnScreen)

const ImageCard = require('./ImageCard').default

const renderWithProviders = (ui: any, options: any = {}) =>
  render(ui, { wrapper: Providers, ...options })

describe('Image Filler', () => {
  const props = {
    imageId: 1,
    perRow: 5,
    perColumn: 3
  }

  const state = {
    image: {
      id: props.imageId,
      urls: { 400: 'url' },
      meta: { keywords: 'keywords' }
    },
    selectedImage: undefined
  }

  beforeEach(() => {
    useSelector.mockReturnValue(state)
    useOnScreen.mockReturnValue(true)
  })

  it('renders successfully', () => {
    const { container } = renderWithProviders(<ImageCard {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('scrolls the image into view when its id is selected', () => {
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView
    const { rerender } = renderWithProviders(<ImageCard {...props} />)
    expect(scrollIntoView).not.toHaveBeenCalled()

    const newState = { ...state, selectedImage: props.imageId }
    useSelector.mockReturnValue(newState)
    rerender(<ImageCard {...props} />)
    expect(scrollIntoView).toHaveBeenCalledTimes(1)
  })
})
