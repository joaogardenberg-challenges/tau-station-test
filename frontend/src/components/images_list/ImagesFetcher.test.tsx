import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import range from 'lodash/range'
import ThemeProvider from 'providers/Theme'

const useDispatch = jest.fn()
const useSelector = jest.fn()
const useOnScreen = jest.fn()
const fetchImages = jest.fn()

jest.doMock('react-redux', () => ({ useDispatch, useSelector }))
jest.doMock('hooks/useOnScreen', () => useOnScreen)
jest.doMock('actions', () => ({ fetchImages }))

const ImagesFetcher = require('./ImagesFetcher').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Image Filler', () => {
  const lastId = 21

  const props = {
    perRow: 5,
    setMissingEnd: jest.fn()
  }

  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn())
    useSelector.mockReturnValue(lastId)
  })

  it('renders successfully when visible', () => {
    useOnScreen.mockReturnValue(true)
    const { container } = renderWithTheme(<ImagesFetcher {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('renders successfully when not visible', () => {
    useOnScreen.mockReturnValue(false)
    const { container } = renderWithTheme(<ImagesFetcher {...props} />)
    expect(container).toMatchSnapshot()
  })

  it('fetches the images when visible', () => {
    useOnScreen.mockReturnValue(true)
    renderWithTheme(<ImagesFetcher {...props} />)

    expect(fetchImages).toHaveBeenCalledTimes(1)
    expect(fetchImages.mock.calls[0][0]).toEqual({
      fromId: lastId - 1,
      limit: props.perRow * 10
    })
  })

  it('sets missing end correctly', () => {
    const missingEnd = 3
    useOnScreen.mockReturnValue(true)
    fetchImages.mockImplementation((_, onSuccess) =>
      onSuccess(range(props.perRow * 10 - missingEnd))
    )

    renderWithTheme(<ImagesFetcher {...props} />)

    expect(props.setMissingEnd).toHaveBeenCalledTimes(1)
    expect(props.setMissingEnd).toHaveBeenCalledWith(missingEnd)
  })

  it('only fetches the images when turning visible', () => {
    useOnScreen.mockReturnValue(false)
    const { rerender } = renderWithTheme(<ImagesFetcher {...props} />)
    expect(fetchImages).not.toHaveBeenCalled()

    useOnScreen.mockReturnValue(true)
    rerender(<ImagesFetcher />)
    expect(fetchImages).toHaveBeenCalledTimes(1)
  })

  it('fetches the images on button click', () => {
    useOnScreen.mockReturnValue(false)
    renderWithTheme(<ImagesFetcher {...props} />)

    const button = screen.getByRole('button', { name: 'Load more' })
    userEvent.click(button)

    expect(fetchImages).toHaveBeenCalledTimes(1)
  })
})
