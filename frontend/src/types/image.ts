export interface ImageMeta {
  location: string
  keywords: string
  datetime: Date
}

export interface Image {
  id: number
  url: string
  meta: ImageMeta
}

export interface ImageParams {
  width: number
}
