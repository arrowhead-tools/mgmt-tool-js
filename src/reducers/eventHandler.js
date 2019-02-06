import { RECEIVE_EVENTS } from '../actions/eventHandler'

const initialState = {
  data: []
}

export default function eventHandler(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return {
        ...state,
        data: action.data
      }
    default:
      return state
  }
}