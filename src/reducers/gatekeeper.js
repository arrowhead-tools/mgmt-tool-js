import {
  RECEIVE_CLOUDS,
  ADD_CLOUD,
  DELETE_CLOUD,
  UPDATE_CLOUD
} from '../actions/gatekeeper'

export const initialState = {
  data: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_CLOUDS:
      return {
        ...state,
        data: action.data
      }
    case ADD_CLOUD:
      return {
        ...state,
        data: action.data
      }
    case DELETE_CLOUD:
      return {
        ...state,
        data: action.data
      }
    case UPDATE_CLOUD:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
