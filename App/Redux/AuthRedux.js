import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  authSessionCheck: ['ignoreNotifStartup'],

  authRequest: ['data'],
  authSuccess: ['payload'],
  authFailure: null,

  authLogoutRequest: ['data'],
  authLogoutSuccess: ['payload'],
  authLogoutFailure: null,

  authError: null,

  authBlocked: ['message'],

  authSessionEnded: null,

  //TEST ONLY, ABAIKAN
  test: null,
})

export const AuthTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: null,
  error: null
})

/* ------------- Selectors ------------- */

export const AuthSelectors = {
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

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AUTH_SESSION_CHECK]: request,
  [Types.AUTH_REQUEST]: request,
  [Types.AUTH_SUCCESS]: success,
  [Types.AUTH_FAILURE]: failure,

  [Types.AUTH_LOGOUT_REQUEST]: request,
  [Types.AUTH_LOGOUT_SUCCESS]: success,
  [Types.AUTH_LOGOUT_FAILURE]: failure,

  [Types.AUTH_ERROR]: failure,
  [Types.AUTH_SESSION_ENDED]: failure,
})
