import networkService from '../services/networkServiceSR'

export const RECEIVE_SYSTEMS = 'RECEIVE_SYSTEMS'

function receiveSystems(systems) {
  return {
    type: RECEIVE_SYSTEMS,
    systems
  }
}

export function getSystems() {
  return dispatch => {
    networkService.get('/mgmt/systems')
      .then(response => {
        dispatch(receiveSystems(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
