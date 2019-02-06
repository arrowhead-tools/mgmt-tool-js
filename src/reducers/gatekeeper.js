import {
  RECEIVE_CLOUDS
} from '../actions/gatekeeper'

export const initialState = {
  data: []
}

export default function services(state = initialState, action = {}) {
  switch(action.type) {
    case RECEIVE_CLOUDS:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
