import {
  RECEIVE_SERVICES_GK
  } from '../actions/gatekeeper'
  
  export const initialState = {
    data: []
  }
  
  export default function services(state = initialState, action = {}) {
    switch (action.type) {
      case RECEIVE_SERVICES_GK:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  