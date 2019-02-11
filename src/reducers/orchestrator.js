import { RECEIVE_ORCHESTRATOR_STORE_DATA } from '../actions/orchestrator'

export const initialState = {
  backup: []
}

export default function orchestrator(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_ORCHESTRATOR_STORE_DATA:
      return {
        ...state,
        backup: action.backup
      }
    default:
      return state
  }
}
