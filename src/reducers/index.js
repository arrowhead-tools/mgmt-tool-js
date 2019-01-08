import { combineReducers } from 'redux'
import auth from './auth'
import global from './global'
import services from './services'
import gatekeeper from './gatekeeper'
import relay from './relay'
import tableData from './orch'
import orchStoreData from './orchStore'
import modal from './modal'
import system from './system'
import { reducer as formReducer } from 'redux-form'
import { reducer as notifications } from 'react-notification-system-redux'

const rootReducer = combineReducers({
  form: formReducer,
  notifications,
  global,
  auth,
  system,
  services,
  gatekeeper,
  relay,
  tableData,
  orchStoreData,
  modal
})

export default rootReducer
