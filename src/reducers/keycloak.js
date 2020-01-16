/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 01. 16.
 */

import {LOGIN_SUCCESS } from '../actions/keycloak'

export const initialState = {
  token: ''
}

export default function keycloak(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}
