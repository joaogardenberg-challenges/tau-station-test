import '@testing-library/react'
import update from 'immutability-helper'
import { INITIAL_STATE, INITIAL_IMAGE } from 'reducers/images'
import {
  getImages,
  isFetchingImages,
  isFetchingImage,
  isWatchingImages,
  getImagesList,
  getImage,
  getLastSortedImageId,
  getSortedImageIds,
  getSelectedImage
} from 'selectors/images'

describe('Images Selectors', () => {
  const imagesList = {
    1: update(INITIAL_IMAGE, { $merge: { id: 1 } }),
    2: { id: 2, isFetching: true }
  }

  const images = update(INITIAL_STATE, { list: { $set: imagesList } })
  const state = { images }

  describe('getImages', () => {
    it('returns the whole state', () => {
      expect(getImages(state)).toEqual(images)
    })
  })

  describe('isFetchingImages', () => {
    it('returns true', () => {
      const newState = update(state, { images: { isFetching: { $set: true } } })
      expect(isFetchingImages(newState)).toEqual(true)
    })

    it('returns false', () => {
      const newState = update(state, {
        images: { isFetching: { $set: false } }
      })

      expect(isFetchingImages(newState)).toEqual(false)
    })
  })

  describe('isWatchingImages', () => {
    it('returns true', () => {
      const newState = update(state, { images: { isWatching: { $set: true } } })
      expect(isWatchingImages(newState)).toEqual(true)
    })

    it('returns false', () => {
      const newState = update(state, {
        images: { isWatching: { $set: false } }
      })

      expect(isWatchingImages(newState)).toEqual(false)
    })
  })

  describe('getImagesList', () => {
    it('returns the whole images list', () => {
      expect(getImagesList(state)).toEqual(imagesList)
    })
  })

  describe('getSortedImageIds', () => {
    it("returns the images list's ids sorted backwards", () => {
      expect(getSortedImageIds(state)).toEqual([2, 1])
    })
  })

  describe('getLastSortedImageId', () => {
    it("return the last image's id", () => {
      expect(getLastSortedImageId(state)).toEqual(1)
    })
  })

  describe('getImage', () => {
    it('returns the image on right id', () => {
      const id = 1
      expect(getImage(state, id)).toEqual(imagesList[id])
    })

    it('returns undefined on wrong id', () => {
      expect(getImage(state, 10)).toEqual(undefined)
    })
  })

  describe('isFetchingImage', () => {
    it('returns true', () => {
      expect(isFetchingImage(state, 2)).toEqual(true)
    })

    it('returns false on right id', () => {
      expect(isFetchingImage(state, 1)).toEqual(false)
    })

    it('returns false on wrong id', () => {
      expect(isFetchingImage(state, 10)).toEqual(false)
    })
  })

  describe('getSelectedImage', () => {
    it('returns the selected image id', () => {
      const id = 1

      const newState = update(state, {
        images: { selectedImage: { $set: id } }
      })

      expect(getSelectedImage(newState)).toEqual(id)
    })

    it('returns undefined when no image is selected', () => {
      expect(getSelectedImage(state)).toEqual(undefined)
    })
  })
})
