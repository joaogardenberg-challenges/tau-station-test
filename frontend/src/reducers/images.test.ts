import '@testing-library/react'
import update from 'immutability-helper'
import mapKeys from 'lodash/mapKeys'
import { Image } from 'types/image'
import imagesReducer, { INITIAL_IMAGE, INITIAL_STATE } from './images'
import {
  FETCH_IMAGES,
  FETCH_IMAGES_SUCCEEDED,
  FETCH_IMAGES_FAILED,
  FETCH_IMAGE,
  FETCH_IMAGE_SUCCEEDED,
  FETCH_IMAGE_FAILED,
  STARTED_WATCHING_IMAGES,
  STOPPED_WATCHING_IMAGES
} from 'actions/types'

const mergeInitialImageWith = (image: Image) =>
  update(INITIAL_IMAGE, { $merge: image })

describe('Images Reducer', () => {
  describe('FETCH_IMAGES', () => {
    it("activates the list's fetching state", () => {
      const prevState = update(INITIAL_STATE, { isFetching: { $set: false } })
      const nextState = imagesReducer(prevState, { type: FETCH_IMAGES })
      expect(nextState.isFetching).toBe(true)
    })
  })

  describe('FETCH_IMAGES_SUCCEEDED', () => {
    it('updates the list with the correct structure', () => {
      const images = [
        { id: 1, url: 'url1' },
        { id: 2, url: 'url2' }
      ]

      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGES_SUCCEEDED,
        payload: images
      })

      expect(nextState.list).toEqual({
        [images[0].id]: mergeInitialImageWith(images[0]),
        [images[1].id]: mergeInitialImageWith(images[1])
      })
    })

    it("updates the list correctly when it's not empty", () => {
      const prevImages = [
        { id: 1, url: 'url1' },
        { id: 2, url: 'url2' }
      ]

      const nextImages = [
        { id: 3, url: 'url3' },
        { id: 4, url: 'url4' }
      ]

      const prevState = update(INITIAL_STATE, {
        list: { $set: mapKeys(prevImages.map(mergeInitialImageWith), 'id') }
      })

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGES_SUCCEEDED,
        payload: nextImages
      })

      expect(nextState.list).toEqual(
        mapKeys(nextImages.map(mergeInitialImageWith), 'id')
      )
    })
  })

  describe('FETCH_IMAGES_FAILED', () => {
    it("deactivates the list's fetching state", () => {
      const prevState = update(INITIAL_STATE, { isFetching: { $set: true } })
      const nextState = imagesReducer(prevState, { type: FETCH_IMAGES_FAILED })
      expect(nextState.isFetching).toBe(false)
    })
  })

  describe('FETCH_IMAGE', () => {
    it("activates the image's fetching state", () => {
      const id = 1
      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGE,
        payload: { id }
      })

      expect(nextState.list[id].isFetching).toBe(true)
    })
  })

  describe('FETCH_IMAGE_SUCCEEDED', () => {
    it('adds the image correctly', () => {
      const image = { isFetching: false, id: 1, url: 'url1' }
      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGE_SUCCEEDED,
        payload: image
      })

      expect(nextState.list[image.id]).toEqual(image)
    })

    it('updates the image correctly', () => {
      const prevImage = { id: 1, url: 'url1' }
      const nextImage = { id: 1, url: 'url2' }

      const prevState = update(INITIAL_STATE, {
        list: { $set: { [prevImage.id]: mergeInitialImageWith(prevImage) } }
      })

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGE_SUCCEEDED,
        payload: nextImage
      })

      expect(nextState.list[prevImage.id]).toEqual(
        mergeInitialImageWith(nextImage)
      )
    })
  })

  describe('FETCH_IMAGE_FAILED', () => {
    it("deactivates the image's fetching state", () => {
      const id = 1
      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: FETCH_IMAGE_FAILED,
        payload: { id }
      })

      expect(nextState.list[id].isFetching).toBe(false)
    })
  })

  describe('STARTED_WATCHING_IMAGES', () => {
    it("activates the list's watching state", () => {
      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: STARTED_WATCHING_IMAGES
      })

      expect(nextState.isWatching).toBe(true)
    })
  })

  describe('STOPPED_WATCHING_IMAGES', () => {
    it("deactivates the list's watching state", () => {
      const prevState = INITIAL_STATE

      const nextState = imagesReducer(prevState, {
        type: STOPPED_WATCHING_IMAGES
      })

      expect(nextState.isWatching).toBe(false)
    })
  })

  describe('default', () => {
    it('returns the unmodified state', () => {
      const prevState = INITIAL_STATE
      const nextState = imagesReducer(prevState, { type: 'whatever' })
      expect(nextState).toBe(prevState)
    })
  })
})
