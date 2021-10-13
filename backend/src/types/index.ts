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

export interface Config {
  [key: string]: string | undefined
}
