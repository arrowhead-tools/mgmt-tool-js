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
        dispatch(receiveOrchestratorStoreData(digestOrchestrationBackupListData(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function savePriorities(priorityData) {
  console.log('prio', priorityData)
  return (dispatch) => {
    networkService.put('/orchestrator/mgmt/store/priorities', { priorities: priorityData })
      .then(response => {
        dispatch(getOrchestrationStoreData())
      })
      .catch(error => {
        console.log(error)
      })
  }
}
