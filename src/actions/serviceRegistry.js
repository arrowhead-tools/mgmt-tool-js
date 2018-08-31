import networkService from '../services/networkServiceSR'
import { services } from '../utils/utils'

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
        dispatch(receiveServices(services.digestService(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
