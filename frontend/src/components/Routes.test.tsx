import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const useHistory = jest.fn()

jest.doMock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory
}))

jest.mock('./images_list/ImagesList')
jest.mock('./image_modal/ImageModal')

const Routes = require('./Routes').default

const renderWithRouter = (
  ui: any,
  { route = '/' }: { route: string } = { route: '/' },
  options: any = {}
) => {
  window.history.pushState({}, 'Router Test', route)
  return render(ui, { wrapper: BrowserRouter, ...options })
}

describe('Routes', () => {
  beforeEach(() => {
    useHistory.mockReturnValue({ replace: jest.fn() })
  })

  it('renders images list successfully', () => {
    const { container } = renderWithRouter(<Routes />, { route: '/images' })

    const imagesList = screen.getByTestId('images-list')
    const imageModal = screen.queryByTestId('image-modal')

    expect(useHistory().replace).not.toHaveBeenCalled()
    expect(imagesList).toBeInTheDocument()
    expect(imageModal).not.toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('renders image modal successfully', () => {
    const { container } = renderWithRouter(<Routes />, { route: '/images/1' })

    const imagesList = screen.getByTestId('images-list')
    const imageModal = screen.getByTestId('image-modal')

    expect(useHistory().replace).not.toHaveBeenCalled()
    expect(imagesList).toBeInTheDocument()
    expect(imageModal).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  it('redirects "/" to "/images"', () => {
    renderWithRouter(<Routes />)
    expect(useHistory().replace).toHaveBeenCalledTimes(1)
    expect(useHistory().replace).toHaveBeenCalledWith('/images')
  })
})
