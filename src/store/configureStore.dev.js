import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import global from '../reducers/global'
import auth from '../reducers/auth'

export const rootReducer = combineReducers({
  form: formReducer,
  global,
  auth
})

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
