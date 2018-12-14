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

export function getFilteredServices(queryDatas) {
  return (dispatch, getState) => {
    networkService.get('/serviceregistry/mgmt/query', queryDatas)
      .then(response => {
        dispatch(receiveServices(groupServicesBySystems(response.data), groupServicesByServices(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
