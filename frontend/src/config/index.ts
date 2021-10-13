import { Config } from 'types'

export const NODE_ENV = process.env.NODE_ENV
export const BACKEND_DOMAIN = process.env.REACT_APP_BACKEND_DOMAIN
export const SECURE = process.env.REACT_APP_SECURE

const config: Config = { NODE_ENV, BACKEND_DOMAIN, SECURE }

Object.keys(config).forEach((key: string) => {
  if (!config[key]) {
    console.warn(
      `[WARNING] There is no REACT_APP_${key} environment variable set!`
    )
  }
})

export default config
