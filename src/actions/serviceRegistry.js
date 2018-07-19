import networkService from '../services/networkService'
import { digestServices } from '../utils/utils'

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'

function receiveServices(items, page) {
  return {
    type: RECEIVE_SERVICES,
    data: { items, page }
  }
}

export function getServices() {
  return (dispatch, getState) => {
    networkService.get('/serviceregistry/mgmt/all')
      .then(response => {
        dispatch(receiveServices(digestServices(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
