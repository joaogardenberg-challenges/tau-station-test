import { combineReducers } from 'redux'
import { NODE_ENV } from 'config'
import { ReducersState } from 'types'
import images from './images'
import watcher from './watcher'

const reducers: ReducersState = { images }

if (NODE_ENV === 'development') {
  reducers.watcher = watcher
}

export default combineReducers(reducers)
