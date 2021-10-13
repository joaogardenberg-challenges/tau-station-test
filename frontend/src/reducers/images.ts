import { AnyAction } from 'redux'
import update from 'immutability-helper'
import mapKeys from 'lodash/mapKeys'
import { ImageState, ImagesState } from 'types'
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

export const INITIAL_IMAGE: ImageState = {
  isFetching: false
}

export const INITIAL_STATE: ImagesState = {
  isFetching: false,
  isWatching: false,
  list: {}
}

export default function imagesReducer(
  state = INITIAL_STATE,
  { type, payload }: AnyAction
) {
  switch (type) {
    case FETCH_IMAGES:
      return update(state, { isFetching: { $set: true } })
    case FETCH_IMAGES_SUCCEEDED:
      return update(state, {
        isFetching: { $set: false },
        list: {
          $set: mapKeys(
            payload.map((image: ImageState) =>
              update(INITIAL_IMAGE, { $merge: image })
            ),
            'id'
          )
        }
      })
    case FETCH_IMAGES_FAILED:
      return update(state, { isFetching: { $set: false } })
    case FETCH_IMAGE:
      return update(state, {
        list: {
          [payload.id]: {
            $set: update(INITIAL_IMAGE, { isFetching: { $set: true } })
          }
        }
      })
    case FETCH_IMAGE_SUCCEEDED:
      return update(state, {
        list: {
          [payload.id]: { $set: update(INITIAL_IMAGE, { $merge: payload }) }
        }
      })
    case FETCH_IMAGE_FAILED:
      return update(state, { list: { [payload.id]: { $set: INITIAL_IMAGE } } })
    case STARTED_WATCHING_IMAGES:
      return update(state, { isWatching: { $set: true } })
    case STOPPED_WATCHING_IMAGES:
      return update(state, { isWatching: { $set: false } })
    default:
      return state
  }
}
