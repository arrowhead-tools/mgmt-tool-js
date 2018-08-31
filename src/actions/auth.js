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
    const testUser = {
      email: email,
      pwd: password
    }
    window.localStorage.setItem('user', JSON.stringify(testUser))

    if ((testUser.email == process.env.REACT_APP_USERNAME) == 0 &&
     (testUser.password == process.env.REACT_APP_PWD == 0)) {
    dispatch(loginSuccess(testUser))
     } else dispatch(loginFailure(testUser))
  }
}

export function startLogout() {
  return function (dispatch) {
    window.localStorage.removeItem('user')
    dispatch(logoutSuccess())
  }
}