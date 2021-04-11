import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'

export let store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export function configureStore(initialState) {
  store = createStore(
    rootReducer,
    initialState || {},
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  )

  return store
}
