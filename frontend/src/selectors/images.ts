import { StoreState } from 'types'

export const getImages = (state: StoreState) => state.images

export const isFetchingImages = (state: StoreState) => state.images.isFetching

export const isWatchingImages = (state: StoreState) => state.images.isWatching

export const getImagesList = (state: StoreState) => state.images.list

export const getImage = (state: StoreState, id: number) => state.images.list[id]

export const isFetchingImage = (state: StoreState, id: number) =>
  Boolean(state.images.list[id]?.isFetching)
