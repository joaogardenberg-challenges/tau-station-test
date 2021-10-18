import { render } from '@testing-library/react'
import Providers from 'providers'

const useSelector = jest.fn()
const useOnScreen = jest.fn()

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

  beforeEach(() => {
    useSelector.mockReturnValue({
      id: props.imageId,
      urls: { 400: 'url' },
      meta: { keywords: 'keywords' }
    })

    useOnScreen.mockReturnValue(true)
  })

  it('renders successfully', () => {
    const { container } = renderWithProviders(<ImageCard {...props} />)
    expect(container).toMatchSnapshot()
  })
})
