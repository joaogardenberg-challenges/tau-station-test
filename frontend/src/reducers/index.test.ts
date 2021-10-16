import '@testing-library/react'
import { createStore } from 'redux'
import { INITIAL_STATE as INITIAL_IMAGES_STATE } from './images'

const reducers = require('.').default

describe('Reducers', () => {
  const store = createStore<any, any, any, any>(reducers)

  it('has the right structure', () => {
    expect(store.getState().images).toEqual(INITIAL_IMAGES_STATE)
  })
})
