import * as API from 'services/api'
import { ImageParams } from 'types'
import { isWatchingImages } from 'selectors'
import {
  FETCH_IMAGES,
  FETCH_IMAGES_SUCCEEDED,
  FETCH_IMAGES_FAILED,
  FETCH_IMAGE,
  FETCH_IMAGE_SUCCEEDED,
  FETCH_IMAGE_FAILED,
  STARTED_WATCHING_IMAGES,
  STOPPED_WATCHING_IMAGES
} from './types'

export const fetchImages = () => async (dispatch: Function) => {
  try {
    dispatch({ type: FETCH_IMAGES })
    const { data: images } = await API.fetchImages()
    dispatch({ type: FETCH_IMAGES_SUCCEEDED, payload: images })
  } catch {
    dispatch({ type: FETCH_IMAGES_FAILED })
  }
}

export const fetchImage =
  (id: number, params?: ImageParams) => async (dispatch: Function) => {
    try {
      dispatch({ type: FETCH_IMAGE, payload: { id } })
      const { data: image } = await API.fetchImage(id, params)
      dispatch({ type: FETCH_IMAGE_SUCCEEDED, payload: image })
    } catch {
      dispatch({ type: FETCH_IMAGE_FAILED, payload: { id } })
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
