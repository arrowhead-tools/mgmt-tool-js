import { combineReducers } from 'redux'
import auth from './auth'
import global from './global'
import services from './services'
import gatekeeper from './gatekeeper'
import relay from './relay'
import tableData from './orch'

import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  form: formReducer,
  global,
  auth,
  services,
  gatekeeper,
  relay,
  tableData
})

export default rootReducer
