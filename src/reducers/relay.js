import {
  RECEIVE_RELAYS
} from '../actions/relay'

export const initialState = {
  data: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_RELAYS:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
