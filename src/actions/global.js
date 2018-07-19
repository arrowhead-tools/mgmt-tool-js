export const SHOW_LOADING_LAYER = 'SHOW_LOADING_LAYER'
export const HIDE_LOADING_LAYER = 'HIDE_LOADING_LAYER'

export function showLoadingLayer() {
  return { type: SHOW_LOADING_LAYER }
}

export function hideLoadingLayer() {
  return { type: HIDE_LOADING_LAYER }
}
