/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, putResolve,take } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'
// import SendDeviceInfoActions from '../Redux/SendDeviceInfoRedux'
import AsyncStorageHelper from '../Lib/AsyncStorageHelper'
import StaticVar from '../Config/StaticVar'
// import NotificationServiceActions from '../Redux/NotificationServiceRedux'
import HandleResponseErrorActions from '../Redux/HandleResponseErrorRedux' 
// import { NotificationServiceTypes } from '../Redux/NotificationServiceRedux' 
// import GetWpActions from '../Redux/GetWpRedux' 
import BackgroundGeolocation from 'react-native-geolocation-service'; 
//import DeviceInfo from 'react-native-device-info'
import { showMessage } from 'react-native-flash-message'
// import * as Sentry from '@sentry/react-native'
import { Toast } from 'native-base'

function delay() {
  return new Promise(resolve => setTimeout(resolve, 1500)); //delay 2.1  detik
}
const getCurrentPositionPromise = (options) => {
  return new Promise((resolve, reject) => {
    BackgroundGeolocation.getCurrentPosition(position => {
      const extractCoordsObject= {...position, ...position.coords}
      resolve({
        success: true,
        position: extractCoordsObject
      })
    }, error => {
      resolve({ 
        success: false,
        error
      })
    }, options)
  })
}

async function getPosition() {
  // const promise = deferred();
  return await getCurrentPositionPromise({ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
}

function * postAuthorized(api, action) {
  const position = yield call(getPosition)
  console.log('position SAYA setelah Authorized !', position)
  //kirim nilai lat long dr variable 'position' di atas ke endpoint yg di tentukan
}

export function * authSessionCheck (api, action) { //masih ada error fungsi array_agg di server8
  const { ignoreNotifStartup } = action
  // yield take(NotificationServiceTypes.NOTIFICATION_SERVICE_TOKEN_SAVED)
  console.log('token saved')
  // yield put(AuthActions.authFailure())
  // return
  
  const session = yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject) 

  //timer //dummy
  if (session) {
    console.log('session', session)
    // Sentry.configureScope(function(scope) {
    //   scope.setUser({
    //     'id': session.m_user_id,
    //     'username': session.email,
    //     'email': session.email
    //   });
    // });
    
    yield putResolve(AuthActions.authSuccess(session))
    // yield call(postAuthorized,api, action)
    return
  }
  /* */
  yield call(delay)
  yield put(AuthActions.authFailure())
  return
  //END - timer //dummy
  //fungsi di server aggr ternyata error !!
  // console.log('1', session)
 
  // if (!session) {
  //   console.log('2')
  //   yield put(AuthActions.authFailure())
  //   return
  // }
  // console.log('3', session) 

  // const fcmtoken = yield call(AsyncStorageHelper(StaticVar.FCM_TOKEN).getDataObject)
  // let fcmtoken = yield call(AsyncStorageHelper(StaticVar.FCM_TOKEN).getDataObject)
  // if (!fcmtoken) {
  //   fcmtoken = { token: 'abcd', os: 'android'}
  // }

  // const response = yield call(api.authSessionCheck, { token: 'hardcode', devicetoken: 'hardcode', os: 'android' })
  // console.log('zzzzzz', JSON.stringify(response))
   
  // if (response.ok) { 
  //   console.log('authSessionCheck response', response.data)
  // console.log('authSessionCheck-fcmtoken', fcmtoken)
  /*
    if (response.data.status_login) {
      console.log('STATUS_LOGIN', response.data.status_login)
    }
    yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).setData, response.data) 
 

    yield putResolve(AuthActions.authSuccess(response.data)) //isinya session {notas, token} 
    // yield put(NotificationServiceActions.notificationServiceStart())
    if (!ignoreNotifStartup) {
      console.log('ignoreNotifStartup')       
    } 
*/
  // yield putResolve(NotificationServiceActions.notificationServiceStart())
  // } else { 
  //   yield put(HandleResponseErrorActions.handleResponseError(response))
  //   yield put(AuthActions.authError())
  //   //bila session tidak valid, baru ke login 
  // } 
}


export function * authRequest (api, action) { //INI LOGIN
  const { data } = action
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  // yield putResolve(NotificationServiceActions.notificationServiceStart())

  // timer //dummy
  // yield call(delay)
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).setData, {dummy: 'dummy'})
  // yield put(AuthActions.authSuccess({dummy: 'dummy'}))
  // return
  // END - timer //dummy

  //const imei = DeviceInfo.getUniqueId()

  // let fcmtoken = yield call(AsyncStorageHelper(StaticVar.FCM_TOKEN).getDataObject)
  // if (!fcmtoken) {
  //   fcmtoken = { token: 'abcd', os: 'android'}
  // }

  // console.log('fcmtoken first login', fcmtoken);
  
  const paramLogin = {...data, imei: data.username /*devicetoken: fcmtoken.token  , os: fcmtoken.os*/ }
  console.log(paramLogin)
  const response = yield call(api.authRequest, paramLogin)

  console.log('response login', response)
  // // success?
  if (response.ok && (!response.data.error)) {
    showMessage({
      message: response.data.message,
      type: 'success',
    })
    console.log('response.login', response.data.data)
    // Sentry.configureScope(function(scope) {
    //   scope.setUser({
    //     'id': response.data.data.m_user_id,
    //     'username': response.data.data.email,
    //     'email': response.data.data.email
    //   });
    // });
    
    yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).setData, response.data.data) 

    yield put(AuthActions.authSuccess(response.data.data)) 
    // yield call(postAuthorized,api, action)  
  } else {
    yield put(HandleResponseErrorActions.handleResponseError(response))
    yield put(AuthActions.authFailure())
  }
}

export function * authLogoutRequest (api, /*action*/) {
  // const { data } = action

  const session = yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject) 
  
  const response = yield call(api.authLogoutRequest, { m_user_id: session.m_user_id })

  if (response.ok) {
    yield putResolve(AuthActions.authSessionEnded())  
    Toast.show({
      text: 'Anda Berhasil Logout',
      type: 'success'
    })
  } else {
    // yield put(HandleResponseErrorActions.handleResponseError(response))
    yield put(AuthActions.authLogoutFailure())
    Toast.show({
      text: 'Gagal Logout, Pastikan anda terhubung dengan Internet',
      type: 'danger'
    })
  }

  //timer //dummy 
  // yield putResolve(AuthActions.authSessionEnded()) 
  // return
  //END - timer //dummy
 
  /*
  //data dari db local 
  const session = yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject)

  // console.log('authLogoutRequest')
  // console.log('local m_user_id', session.m_user_id)
  
  const response = yield call(api.authLogoutRequest, { m_user_id: session.m_user_id }) //di server device_Token belum di nullkan
  
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).clearData) 
    // yield call(AsyncStorageHelper(StaticVar.DB_KEY_NOTAS).clearData) 
    // yield call(AsyncStorageHelper(StaticVar.DB_KEY_EMAIL).clearData) 
    // yield call(AsyncStorageHelper(StaticVar.DB_KEY_USER_ID).clearData)
    // yield call(AsyncStorageHelper(StaticVar.DB_KEY_STATUS_PREMIUM_ID).clearData)
    // yield call(AsyncStorageHelper(StaticVar.DB_KEY_STATUS_USER_ID).clearData)

    yield put(AuthActions.authLogoutSuccess())       //GANTI
    Toast.show({
      text: 'Anda Berhasil Logout',
      type: 'success'
    })
  } else {
    yield put(HandleResponseErrorActions.handleResponseError(response))
    yield put(AuthActions.authLogoutFailure())
    Toast.show({
      text: 'Gagal Logout, Pastikan anda terhubung dengan Internet',
      type: 'danger'
    })
  }
  */
}

export function * authSessionEnded () {
  console.log('auth SESSION ENDED')
  Toast.show({
    text: 'Sesi anda telah berakhir, silahkan login kembali',
    type: 'danger',
    duration: 3000
  })
  yield call(AsyncStorageHelper(StaticVar.DB_KEY_SESSION).clearData) 
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_NOTAS).clearData) 
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_EMAIL).clearData) 
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_USER_ID).clearData)
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_STATUS_PREMIUM_ID).clearData)
  // yield call(AsyncStorageHelper(StaticVar.DB_KEY_STATUS_USER_ID).clearData)
  yield put(AuthActions.authLogoutSuccess())
}

/*
//TEST ONLY, abaikan saga function ini
export function * test (api) { 
  // get current data from Store
  // const currentData = yield select(AuthSelectors.getData)
  // make the call to the api
  const response = yield call(api.test)

  // success?
  if (response.ok) {
    Toast.show({
      text: 'OK',
      type: 'success',
      duration: 3000
    })
  } else {
    yield put(HandleResponseErrorActions.handleResponseError(response, () => alert('heehe') )) 
  }
}
*/