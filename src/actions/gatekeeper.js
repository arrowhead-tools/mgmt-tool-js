import networkService from '../services/networkServiceGK'
import { digestClouds } from '../utils/utils'

export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'
export const ADD_CLOUD = 'ADD_CLOUD'
export const DELETE_CLOUD = 'DELETE_CLOUD'
export const UPDATE_CLOUD = 'UPDATE_CLOUD'

function receiveClouds(data) {
  return {
    type: RECEIVE_CLOUDS,
    data
  }
}

function newCloudAdded(data) {
  return {
    type: ADD_CLOUD,
    data
  }
}

function cloudDeleted(data) {
  return {
    type: DELETE_CLOUD,
    data
  }
}

function cloudUpdated(data) {
  return {
    type: UPDATE_CLOUD,
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

export function addCloud(newCloud) {
  return (dispatch, getState) => {
    networkService.post('/gatekeeper/mgmt/neighborhood', newCloud)
      .then(response => {
        console.log('cloud add', response.data)
        dispatch(newCloudAdded())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function deleteCloud(operator, cloudName) {
  return (dispatch, getState) => {
    networkService.delete(`/gatekeeper/mgmt/neighborhood/operator/${operator}/cloudname/${cloudName}`)
      .then(response => {
        console.log('cloud deleted', response.data)
        dispatch(cloudDeleted())
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function updateCloud(updatedCloud) {
  return (dispatch, getState) => {
    networkService.put(`/mgmt/clouds/${updatedCloud.id}`, updatedCloud)
      .then(response => {
        console.log('cloud updated', response.data)
        dispatch(cloudUpdated())
      })
      .catch(error => {
        console.log(error)
      })
  }
}
