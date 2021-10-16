import { render, screen } from '@testing-library/react'
import Providers from '.'

describe('Providers', () => {
  it('renders children correctly', () => {
    render(
      <Providers>
        <button title="one" />
        <button title="two" />
      </Providers>
    )

    expect(screen.getByRole('button', { name: 'one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'two' })).toBeInTheDocument()
  })
})
