import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'
export const ADD_CLOUD = 'ADD_CLOUD'

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
export function getClouds() {
  return (dispatch, getState) => {
    networkService.get('/gatekeeper/mgmt/neighborhood')
      .then(response => {
        dispatch(receiveClouds(services.digestCloud(response.data)))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function addCloud(newCloud) {
  console.log(newCloud)
  return (dispatch, getState) => {
    networkService.post('/gatekeeper/mgmt/neighborhood', newCloud)
    .then(response => {
      dispatch(newCloudAdded())
      })
      .catch(error => {
        console.log(error)
      })
  }
}