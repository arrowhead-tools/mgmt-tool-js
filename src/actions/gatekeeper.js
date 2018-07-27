import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_SERVICES_GK = 'RECEIVE_SERVICES_GK'

function receiveServices(items, page) {
  return {
    type: RECEIVE_SERVICES_GK,
    data: { items, page }
  }
}

export function getServices() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/neighborhood')
      .then(response => {
        dispatch(receiveServices(services.digestCloud(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
