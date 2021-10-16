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
    const envs = ['REACT_APP_BACKEND_DOMAIN', 'REACT_APP_SECURE']
    envs.forEach((env) => (process.env[env] = undefined))

    const consoleWarn = jest.spyOn(global.console, 'warn')
    await import('.')

    expect(consoleWarn).toHaveBeenCalledTimes(envs.length)

    consoleWarn.mockRestore()
  })
})
