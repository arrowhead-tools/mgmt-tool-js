import {
    RECEIVE_RELAYS,
    ADD_RELAY,
    DELETE_RELAY,
    UPDATE_RELAY
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
        case ADD_RELAY:
        return {
          ...state,
          data: action.data
        }
        case DELETE_RELAY:
        return {
          ...state,
          data: action.data
        }
        case UPDATE_RELAY:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  