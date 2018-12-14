import networkService from '../services/networkServiceSR'
import { groupServicesBySystems, groupServicesByServices } from '../utils/utils'

export const RECEIVE_SERVICES = 'RECEIVE_SERVICES'

function receiveServices(groupBySystems, groupByServices) {
  return {
    type: RECEIVE_SERVICES,
    groupByServices,
    groupBySystems
  }
}

export function getServices() {
  return (dispatch, getState) => {
    networkService.get('/serviceregistry/mgmt/all')
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems(response.data), groupServicesByServices(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getFilteredServices(queryData) {
  return (dispatch, getState) => {
    networkService.put('/serviceregistry/mgmt/query', queryData)
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems({serviceQueryData: response.data}), groupServicesByServices({serviceQueryData: response.data})))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
