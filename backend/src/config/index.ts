import { Config } from '../types'

export const NODE_ENV = process.env.NODE_ENV
export const PORT = process.env.PORT

const config: Config = { NODE_ENV, PORT }

Object.keys(config).forEach((key: string) => {
  if (!config[key]) {
    console.warn(`[WARNING] There is no ${key} environment variable set!`)
  }
})

export default config
