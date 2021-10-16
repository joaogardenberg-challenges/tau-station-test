import { render, screen } from '@testing-library/react'
import ReduxProvider from './Redux'

describe('Redux Provider', () => {
  it('renders children correctly', () => {
    render(
      <ReduxProvider>
        <button title="one" />
        <button title="two" />
      </ReduxProvider>
    )

    expect(screen.getByRole('button', { name: 'one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'two' })).toBeInTheDocument()
  })
})
