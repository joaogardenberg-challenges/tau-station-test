import { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import 'intersection-observer'
import useOnScreen from './useOnScreen'

const Component = () => {
  const ref = useRef()
  const isVisible = useOnScreen(ref)

  return <div ref={ref}>{isVisible ? 'visible' : 'not visible'}</div>
}

describe('useOnScreen', () => {
  it('always not visible because it never intersects anything in jsdom', () => {
    const { container } = render(<Component />)
    expect(screen.getByText('not visible')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })
})
