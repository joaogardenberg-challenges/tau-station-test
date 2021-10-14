export interface ImageUrls {
  [width: number]: string
}

export interface ImageMeta {
  location: string
  keywords: string
  datetime: Date
}

export interface Image {
  id: number
  url: string
  heightRatio: number
  meta: ImageMeta
}

export interface ParsedImage {
  id: number
  urls: ImageUrls
  meta: ImageMeta
}

export interface ImagesStorage {
  images: Image[]
  getImage: Function
  addImage: Function
  resetImages: Function
}

export interface Config {
  [key: string]: string | undefined
}
