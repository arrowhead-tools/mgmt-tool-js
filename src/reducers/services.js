import {
  RECEIVE_SERVICES
} from '../actions/serviceRegistry'

export const initialState = {
  data: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SERVICES:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}
