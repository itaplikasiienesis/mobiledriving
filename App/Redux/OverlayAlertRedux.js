import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  overlayAlertSetShow: ['show', 'text', 'image'],

  overlayAlertSelected: ['ispositive'], 
})

export const OverlayAlertTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  show: null,
  text: '...',
  image: null,
  ispositive: null
})

/* ------------- Selectors ------------- */

export const OverlayAlertSelectors = {
  getShow: state => state.overlayalert.show,
  getText: state => state.overlayalert.text,
  getIsPositive: state => state.overlayalert.ispositive,
}

/* ------------- Reducers ------------- */
 
export const setshow = (state, action) => {
  const { show, text, image } = action
  if (!show) {
    return state.merge({ ispositive: null, show: false, text: INITIAL_STATE.text, image: INITIAL_STATE.image })  
  } 
  return state.merge({ ispositive: null, show, text: (!text) ? INITIAL_STATE.text : text, image: (!image) ? INITIAL_STATE.image : image })
}  

export const setselect = (state, action) => {
  const { ispositive } = action 
  return state.merge({ ispositive, show: false, text: INITIAL_STATE.text, image: INITIAL_STATE.image })
}  

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, { 
  [Types.OVERLAY_ALERT_SET_SHOW]: setshow,
  [Types.OVERLAY_ALERT_SELECTED]: setselect, 
})
