import { EffectCallback } from 'react'
import { render } from '@testing-library/react'
import useDidUpdateEffect from './useDidUpdateEffect'

const Component = ({ effect }: { effect: EffectCallback }) => {
  useDidUpdateEffect(effect)
  return null
}

describe('useDidUpdateEffect', () => {
  it('only calls the effect after a rerender', () => {
    const effect = jest.fn()

    const { rerender } = render(<Component effect={effect} />)
    expect(effect).not.toHaveBeenCalled()

    rerender(<Component effect={effect} />)
    expect(effect).toHaveBeenCalledTimes(1)
  })
})
