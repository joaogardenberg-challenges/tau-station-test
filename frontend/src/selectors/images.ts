import { StoreState, ImagesState, ImageState, ImagesList } from 'types'

export const getImages = (state: StoreState): ImagesState => state.images

export const isFetchingImages = (state: StoreState): boolean =>
  state.images.isFetching

export const isWatchingImages = (state: StoreState): boolean =>
  state.images.isWatching

export const getImagesList = (state: StoreState): ImagesList =>
  state.images.list

export const getSortedImageIds = (state: StoreState): number[] =>
  Object.values(state.images.list)
    .map(({ id }) => id)
    .sort((firstId, secondId) => secondId - firstId)

export const getLastSortedImageId = (state: StoreState): number => {
  const imageIds = getSortedImageIds(state)
  return imageIds[imageIds.length - 1]
}

export const getImage = (state: StoreState, id: number): ImageState =>
  state.images.list[id]

export const isFetchingImage = (state: StoreState, id: number): boolean =>
  Boolean(state.images.list[id]?.isFetching)

export const getSelectedImage = (state: StoreState): number | undefined =>
  state.images.selectedImage
