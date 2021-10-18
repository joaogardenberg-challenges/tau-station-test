import { render, screen } from '@testing-library/react'
import ThemeProvider from 'providers/Theme'

const ImageFiller = require('./ImageFiller').default

const renderWithTheme = (ui: any, options: any = {}) =>
  render(ui, { wrapper: ThemeProvider, ...options })

describe('Image Filler', () => {
  beforeEach(() => {})

  it('renders successfully', () => {
    const { container } = renderWithTheme(<ImageFiller />)
    expect(container).toMatchSnapshot()
  })
})
