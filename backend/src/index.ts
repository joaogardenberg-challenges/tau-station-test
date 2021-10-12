import express from 'express'
import { PORT } from './config'
import addMiddlewares from './middlewares'
import addRoutes from './routes'

const app = express()

addMiddlewares(app)
addRoutes(app)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
