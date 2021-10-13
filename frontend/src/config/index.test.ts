import '@testing-library/react'

describe('Config', () => {
  const oldEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...oldEnv }
  })

  afterEach(() => {
    process.env = oldEnv
  })

  it('warns when there are envs missing', async () => {
    process.env.REACT_APP_BACKEND_DOMAIN = undefined
    process.env.REACT_APP_SECURE = undefined
    const envCount = 2

    const consoleLog = jest.spyOn(global.console, 'warn')
    await import('.')

    expect(consoleLog).toHaveBeenCalledTimes(envCount)

    consoleLog.mockRestore()
  })
})
