import { Application } from 'express'
import { Application as ApplicationWS } from 'express-ws'
import expressWs from 'express-ws'
import bodyParser from 'body-parser'
import cors from 'cors'

export default function middlewares(app: Application): ApplicationWS {
  const { app: newApp }: { app: ApplicationWS } = expressWs(app)

  newApp.use(bodyParser.json())
  newApp.use(cors())

  return newApp
}
