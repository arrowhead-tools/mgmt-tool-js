import networkService from '../services/networkServiceGK'
import { services } from '../utils/utils'

export const RECEIVE_CLOUDS = 'RECEIVE_CLOUDS'

function receiveClouds(items, page) {
  return {
    type: RECEIVE_CLOUDS,
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
