import { StoreState, ImagesState, ImageState, ImagesList } from 'types'

export const getImages = (state: StoreState): ImagesState => state.images

export const isFetchingImages = (state: StoreState): boolean =>
  state.images.isFetching

export const isWatchingImages = (state: StoreState): boolean =>
  state.images.isWatching

export const getImagesList = (state: StoreState): ImagesList =>
  state.images.list

export const getImage = (state: StoreState, id: number): ImageState =>
  state.images.list[id]

export const isFetchingImage = (state: StoreState, id: number): boolean =>
  Boolean(state.images.list[id]?.isFetching)
