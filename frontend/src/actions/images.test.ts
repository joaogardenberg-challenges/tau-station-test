import '@testing-library/react'
import WS from 'jest-websocket-mock'
import {
  FETCH_IMAGES,
  FETCH_IMAGES_SUCCEEDED,
  FETCH_IMAGES_FAILED,
  FETCH_IMAGE,
  FETCH_IMAGE_SUCCEEDED,
  FETCH_IMAGE_FAILED,
  STARTED_WATCHING_IMAGES,
  STOPPED_WATCHING_IMAGES,
  SELECT_IMAGE,
  DESELECT_IMAGE
} from './types'

const API = {
  fetchImages: jest.fn(),
  fetchImage: jest.fn(),
  watchImages: jest.fn()
}

const dispatch = jest.fn()

jest.doMock('services/api', () => API)

const {
  fetchImages,
  fetchImage,
  stopWatchingImages,
  selectImage,
  deselectImage
} = require('actions')

const irrelevantFields = {
  urls: { 48: 'url', 400: 'url', 800: 'url', 1280: 'url' },
  meta: { location: 'location', keywords: '', datetime: new Date().toString() }
}

describe('Images Actions', () => {
  describe('fetchImages', () => {
    it('successfully fetches the images', async () => {
      const images = [{ id: 1, ...irrelevantFields }]

      API.fetchImages.mockReturnValue(Promise.resolve({ data: images }))
      await fetchImages()(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_IMAGES })
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: FETCH_IMAGES_SUCCEEDED,
        payload: images
      })
    })

    it('sends params correctly', async () => {
      const images = [{ id: 1, ...irrelevantFields }]
      API.fetchImages.mockReturnValue(Promise.resolve({ data: images }))

      const params = [
        undefined,
        { fromId: 1 },
        { limit: 1 },
        { fromId: 1, limit: 1 }
      ]

      await fetchImages(params[0])(dispatch)
      await fetchImages(params[1])(dispatch)
      await fetchImages(params[2])(dispatch)
      await fetchImages(params[3])(dispatch)

      expect(API.fetchImages).toHaveBeenCalledTimes(4)
      expect(API.fetchImages).toHaveBeenNthCalledWith(1, params[0])
      expect(API.fetchImages).toHaveBeenNthCalledWith(2, params[1])
      expect(API.fetchImages).toHaveBeenNthCalledWith(3, params[2])
      expect(API.fetchImages).toHaveBeenNthCalledWith(4, params[3])
    })

    it('gracefully handles error', async () => {
      const error = 'error'
      API.fetchImages.mockReturnValue(Promise.reject(error))
      await fetchImages()(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, { type: FETCH_IMAGES })
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: FETCH_IMAGES_FAILED,
        payload: { error }
      })
    })
  })

  describe('fetchImage', () => {
    it('successfully fetches the image', async () => {
      const id = 1
      const image = { id, ...irrelevantFields }

      API.fetchImage.mockReturnValue(Promise.resolve({ data: image }))
      await fetchImage(id)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: FETCH_IMAGE,
        payload: { id }
      })
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: FETCH_IMAGE_SUCCEEDED,
        payload: image
      })
    })

    it('gracefully handles error', async () => {
      const id = 1

      API.fetchImage.mockReturnValue(Promise.reject())
      await fetchImage(id)(dispatch)

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: FETCH_IMAGE,
        payload: { id }
      })
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: FETCH_IMAGE_FAILED,
        payload: { id }
      })
    })
  })

  describe('watchImages', () => {
    const backendDomain = 'localhost:1337'
    const url = `ws://${backendDomain}/images-ws`
    let mockServer: WS
    let getState: jest.MockedFunction<any>

    beforeEach(() => {
      jest.resetModules()
      mockServer = new WS(url)
      API.watchImages.mockReturnValue(new WebSocket(url))
      getState = jest.fn().mockReturnValue({ images: { isWatching: true } })
    })

    afterEach(() => {
      WS.clean()
    })

    it('starts watching images', async () => {
      require('actions').watchImages()(dispatch, getState)

      await mockServer.connected

      expect(dispatch).toHaveBeenCalledTimes(1)
      expect(dispatch).toHaveBeenCalledWith({ type: STARTED_WATCHING_IMAGES })
      expect(dispatch).not.toHaveBeenCalledWith({
        type: STOPPED_WATCHING_IMAGES
      })
      expect(getState).not.toHaveBeenCalled()
    })

    it('dispatches correctly on image received', async () => {
      const image = { id: 1, ...irrelevantFields }
      require('actions').watchImages()(dispatch, getState)

      await mockServer.connected
      await mockServer.send(JSON.stringify(image))

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith({
        type: FETCH_IMAGE_SUCCEEDED,
        payload: image
      })
      expect(dispatch).not.toHaveBeenCalledWith({
        type: STOPPED_WATCHING_IMAGES
      })
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('stops watching images on websocket close', async () => {
      require('actions').watchImages()(dispatch, getState)

      await mockServer.connected
      await mockServer.close()

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith({ type: STOPPED_WATCHING_IMAGES })
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('stops watching images on websocket error', async () => {
      require('actions').watchImages()(dispatch, getState)

      await mockServer.connected
      await mockServer.error()

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenCalledWith({ type: STOPPED_WATCHING_IMAGES })
      expect(getState).toHaveBeenCalledTimes(1)
    })

    it('stops on external changes', async () => {
      const stopConnection = jest.fn()
      require('actions').watchImages()(dispatch, getState)
      mockServer.on('close', () => stopConnection(true))

      await mockServer.connected

      getState.mockReturnValue({ images: { isWatching: false } })

      await mockServer.send('anything')
      await mockServer.closed

      expect(stopConnection).toHaveBeenCalledWith(true)
    })
  })

  describe('stopWatchingImages', () => {
    it('dispatches the right action', () => {
      expect(stopWatchingImages()).toEqual({
        type: STOPPED_WATCHING_IMAGES
      })
    })
  })

  describe('selectImage', () => {
    it('dispatches the right action', () => {
      const id = 1
      expect(selectImage(id)).toEqual({ type: SELECT_IMAGE, payload: id })
    })
  })

  describe('deselectImage', () => {
    it('dispatches the right action', () => {
      expect(deselectImage()).toEqual({ type: DESELECT_IMAGE })
    })
  })
})
