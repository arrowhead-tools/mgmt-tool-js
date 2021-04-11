import networkService from '../services/networkServiceOrch'
import { digestOrchestrationBackupListData } from '../utils/utils'
import { showNotification } from './global'

export const RECEIVE_ORCHESTRATOR_STORE_DATA = 'RECEIVE_ORCHESTRATOR_STORE_DATA'
export const RECEIVE_ORCHESTRATOR_SYSTEMS = 'RECEIVE_ORCHESTRATOR_SYSTEMS'
export const RECEIVE_ORCHESTRATOR_SERVICES = 'RECEIVE_ORCHESTRATOR_SERVICES'
export const RECEIVE_ORCHESTRATOR_CLOUDS = 'RECEIVE_ORCHESTRATOR_CLOUDS'

function receiveOrchestratorStoreData(backup) {
  return {
    type: RECEIVE_ORCHESTRATOR_STORE_DATA,
    backup,
  }
}
export function getOrchestrationStoreData() {
  return (dispatch, getState) => {
    networkService
      .get('/orchestrator/mgmt/store')
      .then((response) => {
        dispatch(
          receiveOrchestratorStoreData(
            digestOrchestrationBackupListData(response.data.data),
          ),
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export function savePriorities(priorityData) {
  return (dispatch) => {
    networkService
      .post('/orchestrator/mgmt/store/modify_priorities', {
        priorityMap: priorityData,
      })
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
      })
  }
}

export function deleteService(serviceId) {
  return (dispatch) => {
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
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Deletion was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'error',
          ),
        )
      })
  }
}

export function addStoreEntry(storeData) {
  return (dispatch) => {
    networkService
      .post('/orchestrator/mgmt/store', [storeData])
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
      })
  }
}

export function deleteStoreEntry(id) {
  return (dispatch) => {
    networkService
      .delete(`/orchestrator/mgmt/store/${id}`)
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Deletion was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Deletion was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
      })
  }
}

export function editStoreEntry(storeEntry, id) {
  return (dispatch) => {
    networkService
      .put(`/orchestrator/mgmt/store/update/${id}`, storeEntry)
      .then((response) => {
        dispatch(
          showNotification(
            {
              title: 'Saving was successful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 5,
            },
            'success',
          ),
        )
        dispatch(getOrchestrationStoreData())
      })
      .catch((error) => {
        console.log(error)
        dispatch(
          showNotification(
            {
              title: 'Saving was unsuccessful',
              message: '',
              position: 'tc',
              dismissible: true,
              autoDismiss: 10,
            },
            'error',
          ),
        )
      })
  }
}
