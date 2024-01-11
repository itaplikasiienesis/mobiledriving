import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  overlaySpinnerRequest: ['data'],
  overlaySpinnerSuccess: ['payload'],
  overlaySpinnerFailure: null,

  overlaySpinnerSetFetching: ['fetching', 'text']
})

export const OverlaySpinnerTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null,
  text: 'Loading ...'
})

/* ------------- Selectors ------------- */

export const OverlaySpinnerSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

export const setfetching = (state, action) => {
  const { fetching, text } = action
  if (!fetching) {
    return state.merge({ fetching: false, text: INITIAL_STATE.text })  
  }

  return state.merge({ fetching, text: (!text) ? INITIAL_STATE.text : text })
}  

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OVERLAY_SPINNER_REQUEST]: request,
  [Types.OVERLAY_SPINNER_SUCCESS]: success,
  [Types.OVERLAY_SPINNER_FAILURE]: failure,
  [Types.OVERLAY_SPINNER_SET_FETCHING]: setfetching,
})
