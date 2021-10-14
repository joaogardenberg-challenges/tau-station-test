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
  urls: ImageUrls
  meta: ImageMeta
}

export interface ImageParams {
  width: number
}
