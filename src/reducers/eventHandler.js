import { RECEIVE_EVENTS } from '../actions/eventHandler'

const initialState = {
  data: [],
  eventNames: []
}

export default function eventHandler(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return {
        ...state,
        data: action.payload.data,
        eventNames: action.payload.eventNames
      }
    default:
      return state
  }
}
