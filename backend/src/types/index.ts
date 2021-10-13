export interface Image {
  id: number
  url: string
}

export interface Config {
  [key: string]: string | number | boolean | undefined
}
