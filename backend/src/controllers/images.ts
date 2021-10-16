import { Request, Response } from 'express'
import * as ws from 'ws'
import random from 'lodash/random'
import createImage from '../services/images/create'
import imagesStorage, { INITIAL_IMAGE_COUNT } from '../services/images/storage'
import parseImage from '../services/images/parse'
import sortImages from '../services/images/sort'
import { Image } from '../types'

const MIN_INTERVAL = 100
const MAX_INTERVAL = 10000
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 1000

const { images, getImage, addImage, resetImages } = imagesStorage()

export function index(req: Request, res: Response) {
  const { fromId, limit } = req.query as { fromId: string; limit: string }
  const parsedId = parseInt(fromId || '0', 10)

  const parsedLimit = Math.min(
    parseInt(limit || '0', 10) || DEFAULT_LIMIT,
    MAX_LIMIT
  )

  const sortedImages = sortImages(images)

  const idIndex = parsedId
    ? images.findIndex(({ id }: Image) => id === parsedId)
    : 0

  res.send(sortedImages.slice(idIndex, idIndex + parsedLimit).map(parseImage))
}

export function show(req: Request, res: Response) {
  const { id } = req.params as { id: string }
  const image = getImage(parseInt(id, 10))

  if (!image) {
    return res.status(404).send({})
  }

  res.send(parseImage(image))
}

export function webSocket(socket: ws) {
  let timeout: NodeJS.Timeout

  const onTimeout = () => {
    if (images.length > MAX_LIMIT) {
      resetImages()
    }

    const newImage = createImage(images.length + 1)
    addImage(newImage)
    const parsedImage = parseImage(newImage)
    socket.send(JSON.stringify(parsedImage))

    timeout = setTimeout(onTimeout, random(MIN_INTERVAL, MAX_INTERVAL))
  }

  timeout = setTimeout(onTimeout, random(MIN_INTERVAL, MAX_INTERVAL))

  socket.on('close', () => clearTimeout(timeout))
  socket.on('error', () => clearTimeout(timeout))
}
