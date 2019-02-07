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
    networkService.get('/gatekeeper/mgmt/neighborhood')
      .then(response => {
        dispatch(receiveClouds(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addCloud(cloudData) {
  const newCloud = [
    { cloud: cloudData }
  ]
  return (dispatch, getState) => {
    networkService.post('/gatekeeper/mgmt/neighborhood', newCloud)
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

export function deleteCloud(operator, cloudName) {
  return (dispatch, getState) => {
    networkService.delete(`/gatekeeper/mgmt/neighborhood/operator/${operator}/cloudname/${cloudName}`)
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
  return (dispatch, getState) => {
    networkService.put(`/mgmt/clouds/${updatedCloud.id}`, updatedCloud)
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
