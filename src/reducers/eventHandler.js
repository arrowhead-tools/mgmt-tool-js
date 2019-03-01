import { RECEIVE_EVENTS, RECEIVE_EH_SYSTEMS } from '../actions/eventHandler'

const initialState = {
  data: [],
  systems: [],
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
    case RECEIVE_EH_SYSTEMS:
      return {
        ...state,
        systems: action.payload
      }
    default:
      return state
  }
}
