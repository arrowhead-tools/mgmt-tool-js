import {
    RECEIVE_ORCH_STORE_DATA
  } from '../actions/orchStore'
  
  export const initialState = {
    data: []
  }
  
  export default function orchStoreData(state = initialState, action = {}) {
    switch (action.type) {
      case RECEIVE_ORCH_STORE_DATA:
        return {
          ...state,
          data: action.data
        }
      default:
        return state
    }
  }
  