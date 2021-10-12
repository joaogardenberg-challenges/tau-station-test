import bodyParser from 'body-parser'
import cors from 'cors'

export default function middlewares(app: any) {
  app.use(bodyParser.json())
  app.use(cors())
}
