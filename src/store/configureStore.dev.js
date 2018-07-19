import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export let store

export function configureStore(initialState) {
  store = createStore(
    rootReducer,
    initialState || {},
    compose(
      applyMiddleware(thunkMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  return store
}
