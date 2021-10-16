import { render, screen } from '@testing-library/react'
import ThemeProvider from './Theme'

describe('Theme Provider', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <button title="one" />
        <button title="two" />
      </ThemeProvider>
    )

    expect(screen.getByRole('button', { name: 'one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'two' })).toBeInTheDocument()
  })
})
