import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import range from 'lodash/range'
import mapKeys from 'lodash/mapKeys'
import ThemeProvider from 'providers/Theme'

const useHistory = jest.fn()
const useParams = jest.fn()
const useSelector = jest.fn()
const useQuery = jest.fn()
const createPortal = (children: any) => children
const CSSTransition = ({ children }: { children: any }) => children

jest.doMock('react-router-dom', () => ({ useHistory, useParams }))
jest.doMock('react-redux', () => ({ useSelector }))
jest.doMock('hooks/useQuery', () => useQuery)
jest.doMock('react-dom', () => ({ createPortal }))

jest.doMock('react-transition-group', () => ({
  ...jest.requireActual('react-transition-group'),
  CSSTransition
}))

jest.mock('./Image')
jest.mock('./ImageSizes')
jest.mock('./ImagesPreloader')
jest.mock('./ImagesFetcher')

const ImageModal = require('./ImageModal').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Image Modal', () => {
  const queryToString = 'query'
  const defaultSelectedId = 2

  const defaultSelector = {
    imagesList: mapKeys(
      range(defaultSelectedId - 1, defaultSelectedId + 2).map((id) => ({ id })),
      'id'
    ),
    isFetching: false
  }

  beforeEach(() => {
    useHistory.mockReturnValue({ push: jest.fn() })
    useParams.mockReturnValue({ id: defaultSelectedId })
    useSelector.mockReturnValue(defaultSelector)

    useQuery.mockReturnValue({
      get: () => '400',
      toString: () => queryToString
    })
  })

  it('renders successfully', () => {
    const { container } = renderWithTheme(<ImageModal />)

    const image = screen.getByTestId('image')
    const imageSizes = screen.getByTestId('image-sizes')
    const imagesPreloader = screen.getByTestId('images-preloader')
    const imagesFetcher = screen.getByTestId('images-fetcher')

    expect(image).toBeInTheDocument()
    expect(imageSizes).toBeInTheDocument()
    expect(imagesPreloader).toBeInTheDocument()
    expect(imagesFetcher).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('closes the modal', () => {
    renderWithTheme(<ImageModal />)

    const closeButton = screen.getByRole('button', { name: 'close' })
    userEvent.click(closeButton)

    expect(useHistory().push).toHaveBeenCalledTimes(1)
    expect(useHistory().push).toHaveBeenCalledWith('/images')
  })

  it('has the correct previous button disabled state', () => {
    const { rerender } = renderWithTheme(<ImageModal />)

    const prevButton = screen.getByRole('button', { name: 'previous' })
    expect(prevButton).not.toHaveAttribute('disabled')

    useParams.mockReturnValue({ id: defaultSelectedId - 1 })
    rerender(<ImageModal />)
    expect(prevButton).toHaveAttribute('disabled')
  })

  it('has the correct next button disabled state', () => {
    const { rerender } = renderWithTheme(<ImageModal />)

    const nextButton = screen.getByRole('button', { name: 'next' })
    expect(nextButton).not.toHaveAttribute('disabled')

    useParams.mockReturnValue({ id: defaultSelectedId + 1 })
    rerender(<ImageModal />)
    expect(nextButton).toHaveAttribute('disabled')
  })

  it('navigates to the previous image', () => {
    renderWithTheme(<ImageModal />)

    const prevButton = screen.getByRole('button', { name: 'previous' })
    userEvent.click(prevButton)

    expect(useHistory().push).toHaveBeenCalledTimes(1)
    expect(useHistory().push).toHaveBeenCalledWith({
      pathname: `/images/${defaultSelectedId - 1}`,
      search: queryToString
    })
  })

  it('navigates to the next image', () => {
    renderWithTheme(<ImageModal />)

    const nextButton = screen.getByRole('button', { name: 'next' })
    userEvent.click(nextButton)

    expect(useHistory().push).toHaveBeenCalledTimes(1)
    expect(useHistory().push).toHaveBeenCalledWith({
      pathname: `/images/${defaultSelectedId + 1}`,
      search: queryToString
    })
  })
})
