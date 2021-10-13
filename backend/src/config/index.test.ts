import { expect } from 'chai'
import sinon from 'sinon'

describe('Config', () => {
  it('warns when there are envs missing', async () => {
    const consoleLog = sinon.stub(console, 'warn')
    const config = await import('.')
    const envCount = Object.keys(config).length - 1
    expect(consoleLog.callCount).to.equal(envCount)
    consoleLog.restore()
  })
})
