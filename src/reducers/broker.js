import {
    RECEIVE_BROKERS
  } from '../actions/broker'
  
  export const initialState = {
    data: []
  }
  
  export default function services(state = initialState, action = {}) {
    switch (action.type) {
      case RECEIVE_BROKERS:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  