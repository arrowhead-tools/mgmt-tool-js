import networkService from '../services/networkServiceOrch'
import { digestOrchestrationBackupListData } from '../utils/utils'
import { showNotification } from './global'

export const RECEIVE_ORCHESTRATOR_STORE_DATA = 'RECEIVE_ORCHESTRATOR_STORE_DATA'

function receiveOrchestratorStoreData(backup) {
  return {
    type: RECEIVE_ORCHESTRATOR_STORE_DATA,
    backup
  }
}

export function getOrchestrationStoreData() {
  return (dispatch, getState) => {
    networkService
      .get('/orchestrator/mgmt/store/all')
      .then(response => {
        dispatch(
          receiveOrchestratorStoreData(
            digestOrchestrationBackupListData(response.data)
          )
        )
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function savePriorities(priorityData) {
  return dispatch => {
    networkService
      .put('/orchestrator/mgmt/store/priorities', { priorities: priorityData })
      .then(response => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'success'
          )
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch(error => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10
            },
            'error'
          )
        )
      })
  }
}

export function deleteService(serviceId) {
  return dispatch => {
    networkService
      .delete(`/mgmt/services/${serviceId}`)
      .then(() => {
        dispatch(
          showNotification(
            {
              title: 'Deletion was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'success'
          )
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch(error => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Deletion was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5
            },
            'error'
          )
        )
      })
  }
}
