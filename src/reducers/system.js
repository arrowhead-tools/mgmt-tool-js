import { RECEIVE_SYSTEMS } from '../actions/system'

export const initialState = {
  system: []
}

export default function system(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SYSTEMS:
      return action.systems
    default:
      return state
  }
}
