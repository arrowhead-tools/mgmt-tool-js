import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_BROKERS = 'RECEIVE_BROKERS'

function receiveBrokers(items, page) {
  return {
    type: RECEIVE_BROKERS,
    data: { items, page }
  }
}

export function getBrokers() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/brokers')
      .then(response => {
        dispatch(receiveBrokers(services.digestBroker(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
