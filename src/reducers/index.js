import { combineReducers } from 'redux'
import global from './global'
import services from './services'
import gatekeeper from './gatekeeper'
import relay from './relay'
import orchestrator from './orchestrator'
import modal from './modal'
import system from './system'
import { reducer as formReducer } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'
import auth from './auth'
import eventHandler from './eventHandler'

const rootReducer = combineReducers({
  form: formReducer,
  notifications,
  global,
  auth,
  system,
  services,
  gatekeeper,
  relay,
  orchestrator,
  modal,
  eventHandler
})

export default rootReducer
