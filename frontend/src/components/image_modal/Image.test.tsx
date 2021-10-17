import { render, screen } from '@testing-library/react'
import ThemeProvider from 'providers/Theme'

const useParams = jest.fn()
const useSelector = jest.fn()
const useQuery = jest.fn()

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams
}))

jest.doMock('react-redux', () => ({ useSelector }))
jest.doMock('hooks/useQuery', () => useQuery)

const Image = require('./Image').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

const image = {
  id: 1,
  urls: { 400: 'http://url400.com' },
  meta: { keywords: 'keywords' }
}

describe('Image', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: 1 })
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
})
