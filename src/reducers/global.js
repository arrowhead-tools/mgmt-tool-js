import { SHOW_LOADING_LAYER, HIDE_LOADING_LAYER } from '../actions/global'

const initialState = {
  isLoadingLayerVisible: false,
  messages: [],
}

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_LOADING_LAYER:
      return {
        ...state,
        isLoadingLayerVisible: true,
      }
    case HIDE_LOADING_LAYER:
      return {
        ...state,
        isLoadingLayerVisible: false,
      }
    default:
      return state
  }
}
