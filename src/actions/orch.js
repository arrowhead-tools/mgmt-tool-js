import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_ORCH_STATUS = 'RECEIVE_ORCH_STATUS'

function receiveOrchStatus(items, page) {
  return {
    type: RECEIVE_ORCH_STATUS,
    data: { items, page }
  }
}

export function getOrchStatus() {
  /*
  return (dispatch, getState) => {
    networkService.get('/orch/mgmt/status')
      .then(response => {
        dispatch(receiveOrchStatus(services.digestOrchStatus(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }*/
  return (dispatch, getState) => {
        dispatch(receiveOrchStatus(services.digestOrchStatus()))
      }
}
