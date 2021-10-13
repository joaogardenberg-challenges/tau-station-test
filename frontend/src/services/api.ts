import axios from 'axios'
import { BACKEND_DOMAIN, SECURE } from 'config'
import { ImageParams } from 'types'

const PROTOCOL = SECURE ? 'https' : 'http'
const WS_PROTOCOL = SECURE ? 'wss' : 'ws'
const BASE_URL = `${PROTOCOL}://${BACKEND_DOMAIN}`
const BASE_WS = `${WS_PROTOCOL}://${BACKEND_DOMAIN}`

export const fetchImages = () => axios.get(`${BASE_URL}/images`)

export const fetchImage = (id: number, params?: ImageParams) =>
  axios.get(`${BASE_URL}/images/${id}`, { params })

export const watchImages = () => new WebSocket(`${BASE_WS}/images-ws`)
