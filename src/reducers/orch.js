import {
  RECEIVE_ORCH_STATUS
  } from '../actions/orch'
  
  export const initialState = {
    data: []
  }
  
  export default function services(state = initialState, action = {}) {
    switch (action.type) {
      case RECEIVE_ORCH_STATUS:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  