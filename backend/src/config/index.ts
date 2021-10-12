export const NODE_ENV = process.env.NODE_ENV || 'development'
export const PORT = process.env.PORT || '4000'

const config: {
  [key: string]: string | undefined
} = { NODE_ENV, PORT }

Object.keys(config).forEach((key: string) => {
  if (!config[key]) {
    console.log(`[WARNING] There is no ${key} environment variable set!`)
  }
})

export default config
