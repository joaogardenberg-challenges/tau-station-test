import '@testing-library/react'
import watcherReducer, { INITIAL_STATE } from './watcher'

describe('Watcher Reducer', () => {
  it('Logs the relevant dispatched actions', async () => {
    const consoleLog = jest.spyOn(global.console, 'log')
    const action = { type: 'type' }

    watcherReducer(INITIAL_STATE, action)
    watcherReducer(INITIAL_STATE, { type: '@@ type' }) // Shouldn't log

    expect(consoleLog).toHaveBeenCalledTimes(1)
    expect(consoleLog.mock.calls[0]).toContain(action)

    consoleLog.mockRestore()
  })
})
