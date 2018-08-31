import networkService from '../services/networkServiceOrch'
import { services } from '../utils/utils'

export const RECEIVE_ORCH_STATUS = 'RECEIVE_ORCH_STATUS'

function receiveOrchStatus(items, page) {
  return {
    type: RECEIVE_ORCH_STATUS,
    data: { items, page }
  }
}

export function getOrchStatus() {
  return (dispatch, getState) => {
        dispatch(receiveOrchStatus(services.digestOrchStatus()))
      }
}
