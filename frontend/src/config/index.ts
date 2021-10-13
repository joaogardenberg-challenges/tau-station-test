export const NODE_ENV = process.env.NODE_ENV
export const BASE_BACKEND_URL = process.env.REACT_APP_BASE_BACKEND_URL

const config: {
  [key: string]: string | undefined
} = { NODE_ENV, BASE_BACKEND_URL }

Object.keys(config).forEach((key: string) => {
  if (!config[key]) {
    console.warn(
      `[WARNING] There is no REACT_APP_${key} environment variable set!`
    )
  }
})

export default config
