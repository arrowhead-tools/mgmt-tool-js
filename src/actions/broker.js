import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_SERVICES_BROKER = 'RECEIVE_SERVICES_BROKER'

function receiveServices(items, page) {
  return {
    type: RECEIVE_SERVICES_BROKER,
    data: { items, page }
  }
}

export function getServices() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/brokers')
      .then(response => {
        dispatch(receiveServices(services.digestBroker(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
