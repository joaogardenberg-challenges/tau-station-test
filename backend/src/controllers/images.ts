import { Request, Response } from 'express'
import * as ws from 'ws'
import random from 'lodash/random'
import createImage from '../services/images/create'
import imagesStorage from '../services/images/storage'
import parseImage from '../services/images/parse'

const MIN_INTERVAL = 100
const MAX_INTERVAL = 10000

const { images, getImage, addImage, resetImages } = imagesStorage()

export function index(_: Request, res: Response) {
  res.send(images.map((image) => parseImage(image)))
}

export function show(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const { width, height } = req.query
  const image = getImage(id)

  if (!image) {
    return res.status(404).send({})
  }

  res.send(parseImage(image, width as string, height as string))
}

export function webSocket(ws: ws) {
  resetImages()

  let timeout: NodeJS.Timeout

  const onTimeout = () => {
    const newImage = createImage(images.length + 1)
    const parsedImage = parseImage(newImage)

    addImage(newImage)
    ws.send(JSON.stringify(parsedImage))

    timeout = setTimeout(onTimeout, random(MIN_INTERVAL, MAX_INTERVAL))
  }

  timeout = setTimeout(onTimeout, random(MIN_INTERVAL, MAX_INTERVAL))

  ws.on('close', () => clearTimeout(timeout))
  ws.on('error', () => clearTimeout(timeout))
}
