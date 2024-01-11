import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  deliveryOrderRequest: ['data'],
  deliveryOrderSuccess: ['payload'],
  deliveryOrderFailure: null,

  deliveryOrderChangeStatusRequest: ['datacs', 'statustext'],
  deliveryOrderChangeStatusSuccess: ['payloadcs'],
  deliveryOrderChangeStatusFailure: null,

  deliveryOrderArrivedRequest: ['dataarrived'],
  deliveryOrderArrivedSuccess: ['payloadarrived'],
  deliveryOrderArrivedFailure: null,

  deliveryOrderArrivedBundleRequest: ['dataarrived'],
  deliveryOrderArrivedBundleSuccess: ['payloadarrived'],
  deliveryOrderArrivedBundleFailure: null,

  deliveryOrderPushMultipleRequest: ['datapushmultiple'],
  deliveryOrderPushMultipleSuccess: ['payloadpushmultiple'],
  deliveryOrderPushMultipleFailure: null,

  deliveryOrderBundleRequest: ['databundle'],
  deliveryOrderBundleSuccess: ['payloadbundle'],
  deliveryOrderBundleFailure: null,
})

export const DeliveryOrderTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  fetching: null,
  payload: [],
  error: null,

  datacs: null,
  fetchingcs: null,
  payloadcs: {},
  errorcs: null,

  dataarrived: null,
  fetchingarrived: null,
  payloadarrived: {},
  errorarrived: null,

  datapushmultiple: null,
  fetchingpushmultiple: null,
  payloadpushmultiple: {},
  errorpushmultiple: null,

  databundle: null,
  fetchingbundle: null,
  payloadbundle: [],
  errorbundle: null,
})

/* ------------- Selectors ------------- */

export const DeliveryOrderSelectors = {
  getData: state => state.deliveryorder.data,
  getPayload: state => state.deliveryorder.payload
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: [] })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: [] })

// request the data from an api
export const requestcs = (state, { datacs }) =>
  state.merge({ fetchingcs: true, datacs, payloadcs: {} })

// successful api lookup
export const successcs = (state, action) => {
  const { payloadcs } = action
  return state.merge({ fetchingcs: false, errorcs: null, payloadcs })
}

// Something went wrong somewhere.
export const failurecs = state =>
  state.merge({ fetchingcs: false, errorcs: true, payloadcs: {} })

//ARRIVED
// request the data from an api
export const requestarrived = (state, { dataarrived }) =>
  state.merge({ fetchingarrived: true, dataarrived, payloadarrived: {} })

// successful api lookup
export const successarrived = (state, action) => {
  const { payloadarrived } = action
  return state.merge({ fetchingarrived: false, errorarrived: null, payloadarrived })
}

// Something went wrong somewhere.
export const failurearrived = state =>
  state.merge({ fetchingarrived: false, errorarrived: true, payloadarrived: {} })

//PUSH MULTIPLE
// request the data from an api
export const requestpushmultiple = (state, { datapushmultiple }) =>
  state.merge({ fetchingpushmultiple: true, datapushmultiple, payloadpushmultiple: {} })

// successful api lookup
export const successpushmultiple = (state, action) => {
  const { payloadpushmultiple } = action
  return state.merge({ fetchingpushmultiple: false, errorpushmultiple: null, payloadpushmultiple })
}

// Something went wrong somewhere.
export const failurepushmultiple = state =>
  state.merge({ fetchingpushmultiple: false, errorpushmultiple: true, payloadpushmultiple: {} })

//BUNDLE
export const requestbundle = (state, { databundle }) =>
  state.merge({ fetchingbundle: true, databundle, payloadbundle: [] })

// successful api lookup
export const successbundle = (state, action) => {
  const { payloadbundle } = action
  return state.merge({ fetchingbundle: false, errorbundle: null, payloadbundle })
}

// Something went wrong somewhere.
export const failurebundle = state =>
  state.merge({ fetchingbundle: false, errorbundle: true, payloadbundle: [] })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELIVERY_ORDER_REQUEST]: request,
  [Types.DELIVERY_ORDER_SUCCESS]: success,
  [Types.DELIVERY_ORDER_FAILURE]: failure,

  [Types.DELIVERY_ORDER_CHANGE_STATUS_REQUEST]: requestcs,
  [Types.DELIVERY_ORDER_CHANGE_STATUS_SUCCESS]: successcs,
  [Types.DELIVERY_ORDER_CHANGE_STATUS_FAILURE]: failurecs,

  [Types.DELIVERY_ORDER_ARRIVED_REQUEST]: requestarrived,
  [Types.DELIVERY_ORDER_ARRIVED_SUCCESS]: successarrived,
  [Types.DELIVERY_ORDER_ARRIVED_FAILURE]: failurearrived,

  [Types.DELIVERY_ORDER_ARRIVED_BUNDLE_REQUEST]: requestarrived,
  [Types.DELIVERY_ORDER_ARRIVED_BUNDLE_SUCCESS]: successarrived,
  [Types.DELIVERY_ORDER_ARRIVED_BUNDLE_FAILURE]: failurearrived,
   
  [Types.DELIVERY_ORDER_PUSH_MULTIPLE_REQUEST]: requestpushmultiple,
  [Types.DELIVERY_ORDER_PUSH_MULTIPLE_SUCCESS]: successpushmultiple,
  [Types.DELIVERY_ORDER_PUSH_MULTIPLE_FAILURE]: failurepushmultiple,

  [Types.DELIVERY_ORDER_BUNDLE_REQUEST]: requestbundle,
  [Types.DELIVERY_ORDER_BUNDLE_SUCCESS]: successbundle,
  [Types.DELIVERY_ORDER_BUNDLE_FAILURE]: failurebundle,
})
