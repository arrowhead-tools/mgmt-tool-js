import networkService from '../services/networkServiceOrch'
import { services } from '../utils/utils'

export const RECEIVE_ORCH_STORE_DATA = 'RECEIVE_ORCH_STORE_DATA'

function receiveOrchStoreData(items, page) {
  return {
    type: RECEIVE_ORCH_STORE_DATA,
    data: { items, page }
  }
}

export function getOrchStoreData() {
  return (dispatch, getState) => {
    networkService.get("/orchestrator/mgmt/store/all")
      .then(response => {
        dispatch(receiveOrchStoreData(services.digestOrchStoreData(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
