import express from 'express'
import { PORT } from './config'
import addMiddlewares from './middlewares'
import addRoutes from './routes'

const app = express()
const appWS = addMiddlewares(app)
addRoutes(appWS)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
