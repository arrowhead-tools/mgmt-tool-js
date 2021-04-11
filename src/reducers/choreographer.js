import {
  RECEIVE_SINGLE_CHOREOGRAPHER_DATA,
  REVEIVE_ALL_CHOREOGRAPHER_DATA,
} from '../actions/choreographer'

const initialState = {
  data: [],
  single: {},
}

export default function choreographer(state = initialState, action = {}) {
  switch (action.type) {
    case RECEIVE_SINGLE_CHOREOGRAPHER_DATA:
      return {
        ...state,
        single: { ...state.single, [action.id]: action.data },
      }
    case REVEIVE_ALL_CHOREOGRAPHER_DATA:
      return {
        ...state,
        data: action.data,
      }
    default:
      return state
  }
}
