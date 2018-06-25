import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import global from '../reducers/global'

export const rootReducer = combineReducers({
  form: formReducer,
  global
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
