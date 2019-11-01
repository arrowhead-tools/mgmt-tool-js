import networkService from '../services/networkServiceGK'
import { showNotification } from './global'

export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'

function receiveClouds(data) {
  return {
    type: RECEIVE_CLOUDS,
    data
  }
}

export function getClouds() {
  return (dispatch, getState) => {
    networkService
      .get('/gatekeeper/mgmt/clouds')
      .then(response => {
        dispatch(receiveClouds(response.data.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addCloud(cloudData) {
  const newCloud = {...cloudData}
  newCloud.gatekeeperRelayIds = cloudData.gatekeeperRelays.map(relay => relay.id)
  newCloud.gatewayRelayIds = cloudData.gatewayRelays.map(relay => relay.id)
  delete newCloud.gatekeeperRelays
  delete newCloud.gatewayRelays
  return (dispatch, getState) => {
    networkService
      .post('/gatekeeper/mgmt/clouds', [newCloud])
      .then(response => {
        dispatch(getClouds())
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

export function deleteCloud(id) {
  return (dispatch, getState) => {
    networkService
      .delete(
        `/gatekeeper/mgmt/clouds/${id}`
      )
      .then(response => {
        dispatch(getClouds())
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

export function updateCloud(updatedCloud) {
  const newCloud = {...updatedCloud}
  newCloud.gatekeeperRelayIds = updatedCloud.gatekeeperRelays.map(relay => relay.id)
  newCloud.gatewayRelayIds = updatedCloud.gatewayRelays.map(relay => relay.id)
  delete newCloud.gatekeeperRelays
  delete newCloud.gatewayRelays
  return (dispatch, getState) => {
    networkService
      .put(`gatekeeper/mgmt/clouds/${updatedCloud.id}`, newCloud)
      .then(response => {
        dispatch(getClouds())
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
