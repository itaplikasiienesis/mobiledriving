import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import API_PROTECTED from '../Services/Api_Protected'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
// import { GithubTypes } from '../Redux/GithubRedux'
import { AuthTypes } from '../Redux/AuthRedux'
import { HandleResponseErrorTypes } from '../Redux/HandleResponseErrorRedux' 
import { DeliveryOrderTypes } from '../Redux/DeliveryOrderRedux' 


/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
// import { getUserAvatar } from './GithubSagas'
import { 
  authSessionCheck,
  authRequest,
  authLogoutRequest,
  authSessionEnded,
  //test only
  // test
} from './AuthSagas'
import { handleResponseError } from './HandleResponseErrorSagas'
import { deliveryOrderRequest, deliveryOrderChangeStatusRequest, deliveryOrderArrivedRequest, deliveryOrderPushMultipleRequest, deliveryOrderBundleRequest, deliveryOrderArrivedBundleRequest } from './DeliveryOrderSagas'



/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : {...API.create(), ...API_PROTECTED.create()}

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // some sagas receive extra parameters in addition to an action
    // takeLatest(GithubTypes.USER_REQUEST, getUserAvatar, api),

    takeLatest(HandleResponseErrorTypes.HANDLE_RESPONSE_ERROR, handleResponseError), 

    //AUTH
    takeLatest(AuthTypes.AUTH_SESSION_CHECK, authSessionCheck, api),
    takeLatest(AuthTypes.AUTH_REQUEST, authRequest, api),
    takeLatest(AuthTypes.AUTH_LOGOUT_REQUEST, authLogoutRequest, api),
    takeLatest(AuthTypes.AUTH_SESSION_ENDED, authSessionEnded),

    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_REQUEST, deliveryOrderRequest, api),
    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_CHANGE_STATUS_REQUEST, deliveryOrderChangeStatusRequest, api),
    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_ARRIVED_REQUEST, deliveryOrderArrivedRequest, api),
    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_PUSH_MULTIPLE_REQUEST, deliveryOrderPushMultipleRequest, api),
    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_BUNDLE_REQUEST, deliveryOrderBundleRequest, api),
    takeLatest(DeliveryOrderTypes.DELIVERY_ORDER_ARRIVED_BUNDLE_REQUEST, deliveryOrderArrivedBundleRequest, api),
  ])
}
