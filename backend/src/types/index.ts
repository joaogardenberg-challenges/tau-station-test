export interface Image {
  id: number
  url: string
  heightRatio: number
}

export interface Config {
  [key: string]: string | undefined
}
