import networkService from '../services/networkServiceGK'
import { digestClouds } from '../utils/utils'

export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'
export const ADD_CLOUD = 'ADD_CLOUD'
export const DELETE_CLOUD = 'DELETE_CLOUD'
export const UPDATE_CLOUD = 'UPDATE_CLOUD'

function receiveClouds(items, page) {
  return {
    type: RECEIVE_CLOUDS,
    data: { items, page }
  }
}

function newCloudAdded(items, page) {
  return {
    type: ADD_CLOUD,
    data: { items, page }
  }
}

function cloudDeleted(items, page) {
  return {
    type: DELETE_CLOUD,
    data: { items, page }
  }
}

function cloudUpdated(items, page) {
  return {
    type: UPDATE_CLOUD,
    data: { items, page }
  }
}

export function getClouds() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/neighborhood')
      .then(response => {
        dispatch(receiveClouds(digestClouds(response.data)))
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
      dispatch(newCloudAdded())
      window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function deleteCloud(operator, cloudName) {
  return (dispatch, getState) => {
    networkService.delete('/gatekeeper/mgmt/neighborhood/operator/'  + 
                          operator + '/cloudname/' + cloudName )
    .then(response => {
      dispatch(cloudDeleted())
      window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function updateCloud(updatedCloud) {
  return (dispatch, getState) => {
    networkService.put('/mgmt/clouds/' + updatedCloud.id, updatedCloud )
    .then(response => {
      dispatch(cloudUpdated())
      window.location.reload()
      })
      .catch(error => {
        console.log(error)
      })
  }
}