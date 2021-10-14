import axios, { AxiosResponse } from 'axios'
import { BACKEND_DOMAIN, SECURE } from 'config'

const PROTOCOL = SECURE === 'true' ? 'https' : 'http'
const WS_PROTOCOL = SECURE === 'true' ? 'wss' : 'ws'
const BASE_URL = `${PROTOCOL}://${BACKEND_DOMAIN}`
const BASE_WS = `${WS_PROTOCOL}://${BACKEND_DOMAIN}`

export const fetchImages = (): Promise<AxiosResponse> =>
  axios.get(`${BASE_URL}/images`)

export const fetchImage = (id: number): Promise<AxiosResponse> =>
  axios.get(`${BASE_URL}/images/${id}`)

export const watchImages = (): WebSocket =>
  new WebSocket(`${BASE_WS}/images-ws`)
