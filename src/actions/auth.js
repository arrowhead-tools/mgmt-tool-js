export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

export function loginSuccess(userData) {
  return { type: LOGIN_SUCCESS, userData }
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error }
}

export function logoutSuccess() {
  return { type: LOGOUT_SUCCESS }
}

export function startLogin(email, password) {
  return function (dispatch) {
    const mockUserData = {
      name: 'Test User',
      email: 'test_user@email.com'
    }
    window.localStorage.setItem('user', JSON.stringify(mockUserData))
    dispatch(loginSuccess(mockUserData))
  }
}

export function startLogout() {
  return function (dispatch) {
    window.localStorage.setItem('user')
    dispatch(logoutSuccess())
  }
}
