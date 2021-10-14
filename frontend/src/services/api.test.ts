import '@testing-library/react'

const axiosGet = jest.fn()
const webSocket = jest.fn()

class WebSocketMock extends WebSocket {
  constructor(props: any) {
    super(props)
    webSocket(props)
  }
}

global.WebSocket = WebSocketMock
jest.doMock('axios', () => ({ get: axiosGet }))

describe('API Service', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  describe('Fetch Images', () => {
    it('uses the right insecure url', () => {
      process.env.REACT_APP_BACKEND_DOMAIN = 'backend'
      process.env.REACT_APP_SECURE = 'false'
      require('./api').fetchImages()
      expect(axiosGet).toHaveBeenCalledWith('http://backend/images')
    })

    it('uses the right secure url', () => {
      process.env.REACT_APP_BACKEND_DOMAIN = 'backend'
      process.env.REACT_APP_SECURE = 'true'
      require('./api').fetchImages()
      expect(axiosGet).toHaveBeenCalledWith('https://backend/images')
    })
  })

  describe('Fetch Image', () => {
    it('uses the right url', () => {
      process.env.REACT_APP_BACKEND_DOMAIN = 'backend'
      process.env.REACT_APP_SECURE = 'false'

      const id = 3
      require('./api').fetchImage(id)

      expect(axiosGet).toHaveBeenCalledWith(`http://backend/images/${id}`)
    })

    it('sends the right params', () => {
      process.env.REACT_APP_BACKEND_DOMAIN = 'backend'
      process.env.REACT_APP_SECURE = 'false'

      const id = 3
      const params = { width: 100 }
      require('./api').fetchImage(id)

      expect(axiosGet).toHaveBeenCalledWith(`http://backend/images/${id}`)
    })
  })

  describe('Watch Images', () => {
    it('uses the right url', () => {
      process.env.REACT_APP_BACKEND_DOMAIN = 'backend'
      process.env.REACT_APP_SECURE = 'false'
      require('./api').watchImages()

      expect(webSocket).toHaveBeenCalledWith('ws://backend/images-ws')
    })
  })
})
