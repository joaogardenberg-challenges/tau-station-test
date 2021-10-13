import '@testing-library/react'

describe('Config', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('warns when there are envs missing', async () => {
    Object.keys(process.env).forEach((key) => (process.env[key] = undefined))

    const consoleLog = jest.spyOn(global.console, 'warn')
    const config = await import('.')
    const envCount = Object.keys(config).length - 1

    expect(consoleLog).toHaveBeenCalledTimes(envCount)

    consoleLog.mockRestore()
  })
})
