import {
  SHOW_LOADING_LAYER,
  HIDE_LOADING_LAYER
} from './global'
import { LOGIN_FAILURE, LOGIN_SUCCESS } from './auth'

export function showLoadingLayer() {
  return { type: SHOW_LOADING_LAYER }
}

export function hideLoadingLayer() {
  return { type: HIDE_LOADING_LAYER }
}

export function loginSuccess(userData) {
  return { type: LOGIN_SUCCESS, userData }
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error }
}

export function startLogin(email, password) {
  return function (dispatch) {
    const mockUserData = {
      name: 'Test User',
      email: 'test_user@email.com'
    }
    dispatch(loginSuccess(mockUserData))
  }
}
