import { Request, Response } from 'express'
import * as ws from 'ws'
import createImage from '../services/images/create'
import imagesStorage from '../services/images/storage'
import parseImage from '../services/images/parse'

const { images, getImage, addImage } = imagesStorage()

export function index(_: Request, res: Response) {
  res.send(images.map((image) => parseImage(image)))
}

export function show(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const image = getImage(id)

  if (!image) {
    return res.status(404).send({})
  }

  res.send(parseImage(image))
}

export function webSocket(ws: ws) {
  const interval = setInterval(() => {
    const newImage = createImage(images.length + 1)
    const parsedImage = parseImage(newImage)
    addImage(newImage)
    ws.send(JSON.stringify(parsedImage))
  }, 1000)

  ws.on('close', () => clearInterval(interval))
  ws.on('error', () => clearInterval(interval))
}
