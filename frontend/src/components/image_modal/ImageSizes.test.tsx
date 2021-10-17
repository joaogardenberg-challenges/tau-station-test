import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeProvider from 'providers/Theme'

const useHistory = jest.fn()
const useLocation = jest.fn()
const useQuery = jest.fn()

jest.doMock('react-router-dom', () => ({
  useHistory,
  useLocation
}))

jest.doMock('hooks/useQuery', () => useQuery)

const ImageSizes = require('./ImageSizes').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Image Sizes', () => {
  const pathname = '/images/1'
  const queryToString = 'query'

  beforeEach(() => {
    useHistory.mockReturnValue({ replace: jest.fn() })
    useLocation.mockReturnValue({ pathname })
    useQuery.mockReturnValue({
      get: () => '400',
      set: jest.fn(),
      toString: () => queryToString
    })
  })

  it('renders successfully', () => {
    const { container } = renderWithTheme(<ImageSizes />)
    expect(container).toMatchSnapshot()
  })

  it("changes the url's width on button click", () => {
    const newWidth = '800'
    renderWithTheme(<ImageSizes />)

    const button800 = screen.getByRole('button', { name: `${newWidth}px` })
    userEvent.click(button800)

    expect(useQuery().set).toHaveBeenCalledTimes(1)
    expect(useQuery().set).toHaveBeenCalledWith('width', newWidth)
    expect(useHistory().replace).toHaveBeenCalledTimes(1)
    expect(useHistory().replace).toHaveBeenCalledWith({
      pathname,
      search: queryToString
    })
  })
})
