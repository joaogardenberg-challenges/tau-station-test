import noop from 'lodash/noop'
import * as API from 'services/api'
import { ImagesParams } from 'types'
import { isWatchingImages } from 'selectors'
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

export const fetchImages =
  (params?: ImagesParams, onSuccess = noop) =>
  async (dispatch: Function) => {
    try {
      dispatch({ type: FETCH_IMAGES })
      const { data: images } = await API.fetchImages(params)
      dispatch({ type: FETCH_IMAGES_SUCCEEDED, payload: images })
      onSuccess(images)
    } catch (error) {
      dispatch({ type: FETCH_IMAGES_FAILED, payload: { error } })
    }
  }

export const fetchImage = (id: number) => async (dispatch: Function) => {
  try {
    dispatch({ type: FETCH_IMAGE, payload: { id } })
    const { data: image } = await API.fetchImage(id)
    dispatch({ type: FETCH_IMAGE_SUCCEEDED, payload: image })
  } catch (error) {
    dispatch({ type: FETCH_IMAGE_FAILED, payload: { id, error } })
  }
}

export const watchImages =
  () => async (dispatch: Function, getState: Function) => {
    try {
      const webSocket = API.watchImages()

      webSocket.onopen = () => dispatch({ type: STARTED_WATCHING_IMAGES })

      webSocket.onmessage = ({ data }) => {
        if (!isWatchingImages(getState())) {
          return webSocket.close()
        }

        dispatch({ type: FETCH_IMAGE_SUCCEEDED, payload: JSON.parse(data) })
      }

      const onError = () => {
        webSocket.onclose = null
        webSocket.onerror = null

        if (isWatchingImages(getState())) {
          dispatch({ type: STOPPED_WATCHING_IMAGES })
        }
      }

      webSocket.onclose = onError
      webSocket.onerror = onError
    } catch {
      dispatch({ type: STOPPED_WATCHING_IMAGES })
    }
  }

export const stopWatchingImages = () => ({ type: STOPPED_WATCHING_IMAGES })

export const selectImage = (id: number) => ({ type: SELECT_IMAGE, payload: id })

export const deselectImage = () => ({ type: DESELECT_IMAGE })
