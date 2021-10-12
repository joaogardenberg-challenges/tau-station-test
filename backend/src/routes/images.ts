import { Application as ApplicationWS } from 'express-ws'
import { index, show, webSocket } from '../controllers/images'

export default function imagesRoutes(app: ApplicationWS) {
  app.get('/images', index)
  app.get('/images/:id', show)
  app.ws('/images-ws', webSocket)
}
