import { Application as ApplicationWS } from 'express-ws'
import imagesRoutes from './images'

export default function routes(app: ApplicationWS) {
  imagesRoutes(app)
}
