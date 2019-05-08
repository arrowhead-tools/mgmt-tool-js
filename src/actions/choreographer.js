import networkService from '../services/networkServiceCH'
import { showNotification } from './global'
import { hideModal } from "./modal"

export const REVEIVE_ALL_CHOREOGRAPHER_DATA = 'RECEIVE_ALL_CHOREOGRAPHER_DATA'
export const RECEIVE_SINGLE_CHOREOGRAPHER_DATA =
  'RECEIVE_SINGLE_CHOREOGRAPHER_DATA'

function receiveAllData(data) {
  return {
    type: REVEIVE_ALL_CHOREOGRAPHER_DATA,
    data
  }
}

function receiveSingleData(id, data) {
  return {
    type: RECEIVE_SINGLE_CHOREOGRAPHER_DATA,
    id,
    data
  }
}

export function getAllChoreographerData() {
  return dispatch => {
    networkService
      .get('/choreographer/plan')
      .then(response => {
        dispatch(receiveAllData(response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function getSingleChoreographerData(id) {
  return dispatch => {
    networkService
      .get(`/choreographer/plan/${id}`)
      .then(response => {
        dispatch(receiveSingleData(id, response.data))
      })
      .catch(error => {
        console.log(error)
      })
  }
}

export function deletePlan(id) {
  return dispatch => {
    networkService
      .delete(`/choreographer/plan/${id}`)
      .then(response => {
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
        dispatch(getAllChoreographerData())
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

export function createPlan(plan) {
  return dispatch => {
    networkService
      .post(`/choreographer/plan`, plan)
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
        dispatch(getAllChoreographerData())
        dispatch(hideModal())
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
