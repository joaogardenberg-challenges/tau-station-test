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
}

export interface ImagesState {
  isFetching: boolean
  isWatching: boolean
  list: { [key: number]: ImageState }
}

export interface WatcherState {
  watching: boolean
}
