import { Action, Reducer } from 'redux'
import { Image } from 'types/image'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: any
  }
}

export interface ActionWithPayload extends Action {
  payload: any
}

export interface StoreState {
  images: ImagesState
  watcher?: WatcherState
}

export interface ReducersState {
  images: Reducer
  watcher?: Reducer
}

export interface ImageState extends Partial<Image> {
  isFetching: boolean
  error?: any
}

export interface ImagesState {
  isFetching: boolean
  isWatching: boolean
  list: { [key: number]: ImageState }
  error?: any
}

export interface WatcherState {
  watching: boolean
}
