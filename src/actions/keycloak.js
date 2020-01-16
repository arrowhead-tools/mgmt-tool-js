/**
 * @author Svetlin Tanyi <szvetlin@aitia.ai> on 2020. 01. 16.
 */


export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function loginSuccess(token) {
  console.log('loginAction', token)
  return { type: LOGIN_SUCCESS, token }
}

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error }
}
