import {
  RECEIVE_SERVICES
} from '../actions/serviceRegistry'

export const initialState = {
  groupBySystems: [],
  groupByServices: []
}

export default function services(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SERVICES:
      return {
        ...state,
        data: {
          groupBySystems: action.groupBySystems,
          groupByServices: action.groupByServices
        }
      }
    default:
      return state
  }
}
