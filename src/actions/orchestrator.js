import networkService from '../services/networkServiceOrch'
import { digestOrchestrationBackupListData } from '../utils/utils'

export const RECEIVE_ORCHESTRATOR_STORE_DATA = 'RECEIVE_ORCHESTRATOR_STORE_DATA'

function receiveOrchestratorStoreData(backup) {
  return {
    type: RECEIVE_ORCHESTRATOR_STORE_DATA,
    backup
  }
}

export function getOrchestrationStoreData() {
  return (dispatch, getState) => {
    networkService.get('/orchestrator/mgmt/store/all')
      .then(response => {
        console.log('res', response.data)
        dispatch(receiveOrchestratorStoreData(digestOrchestrationBackupListData(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}
