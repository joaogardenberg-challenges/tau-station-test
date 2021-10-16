import { render, screen } from '@testing-library/react'
import RouterProvider from './Router'

describe('Router Provider', () => {
  it('renders children correctly', () => {
    render(
      <RouterProvider>
        <button title="one" />
        <button title="two" />
      </RouterProvider>
    )

    expect(screen.getByRole('button', { name: 'one' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'two' })).toBeInTheDocument()
  })
})
