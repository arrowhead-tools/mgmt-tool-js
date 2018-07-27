import {
    RECEIVE_SERVICES_BROKER
  } from '../actions/broker'
  
  export const initialState = {
    data: []
  }
  
  export default function services(state = initialState, action = {}) {
    switch (action.type) {
      case RECEIVE_SERVICES_BROKER:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  