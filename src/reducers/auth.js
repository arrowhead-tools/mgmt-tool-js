import { RECEIVE_AUTH_DATA, RECEIVE_AUTH_SERVICES, RECEIVE_AUTH_SYSTEMS } from '../actions/auth'

export const initialState = {
  data: [],
  systems: [],
  services: []
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_AUTH_DATA:
      return {
        ...state,
        data: action.data
      }
    case RECEIVE_AUTH_SYSTEMS:
      return {
        ...state,
        systems: action.systems
      }
    case RECEIVE_AUTH_SERVICES:
      return {
        ...state,
        services: action.services
      }
    default:
      return state
  }
}
