import { AnyAction } from 'redux'
import { WatcherState } from 'types'

const INITIAL_STATE: WatcherState = { watching: true }

export default function watcherReducer(
  state = INITIAL_STATE,
  action: AnyAction
): WatcherState {
  if (!action.type.startsWith('@@')) {
    // eslint-disable-next-line no-console
    console.log('%cAction:', 'color: #00f', action)
  }

  return state
}
