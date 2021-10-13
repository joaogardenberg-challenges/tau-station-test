import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'
import identity from 'lodash/identity'
import reducers from 'reducers'
import { ProviderProps } from 'types'

export const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : identity
  )
)

export default function ReduxProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>
}
