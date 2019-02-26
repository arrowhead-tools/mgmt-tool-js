import {
  RECEIVE_ORCHESTRATOR_STORE_DATA,
  RECEIVE_ORCHESTRATOR_CLOUDS,
  RECEIVE_ORCHESTRATOR_SERVICES,
  RECEIVE_ORCHESTRATOR_SYSTEMS
} from '../actions/orchestrator'

export const initialState = {
  backup: [],
  clouds: [],
  services: [],
  systems: []
}

export default function orchestrator(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_ORCHESTRATOR_STORE_DATA:
      return {
        ...state,
        backup: action.backup
      }
    case RECEIVE_ORCHESTRATOR_SYSTEMS:
      return {
        ...state,
        systems: action.systems
      }
    case RECEIVE_ORCHESTRATOR_SERVICES:
      return {
        ...state,
        services: action.services
      }
    case RECEIVE_ORCHESTRATOR_CLOUDS:
      return {
        ...state,
        clouds: action.clouds
      }
    default:
      return state
  }
}
