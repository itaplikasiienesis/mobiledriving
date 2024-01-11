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

import { call, put } from 'redux-saga/effects'
import HandleResponseErrorActions from '../Redux/HandleResponseErrorRedux'
import AuthActions from '../Redux/AuthRedux'
import { Toast } from 'native-base'
import { showMessage } from 'react-native-flash-message' 
// import { HandleResponseErrorSelectors } from '../Redux/HandleResponseErrorRedux'

export function * handleResponseError (action) {
  const { response, cb, injectcallback } = action

  if (injectcallback) {
    const {code, callback} = injectcallback
    if (code === response.status) {
      callback()
    }
  }
  console.log(response);
  
  
  let errMessage = 'Network Error'
  switch(response.status) {
  case 0:
    errMessage = 'Exception in Server'
    break
  case 401:
    console.log('response 401', response);
    errMessage = response.message
    //eksekusi go to loggin screen
    yield put(AuthActions.authSessionEnded())
    break
  case 500:
    console.log('response 500', response);
    errMessage = (response.data) ? response.data.meta.message : errMessage
    // Sentry.captureException(response)
    break
  default:
    errMessage = '' 
    try {
      if (response.problem === 'TIMEOUT_ERROR' || response.problem === 'NETWORK_ERROR') {
        errMessage = 'Gagal Terhubung, Harap Coba Lagi'
      } else if (response.data && response.data.error) {
        errMessage = response.data.message        
      }
    } catch(e) {
      errMessage = 'Unknown Error'
    }
    break
  }
  if (errMessage) {
    // Toast.show({
    //   text: errMessage,
    //   type: 'danger',
    //   duration: 2500
    // })    
    showMessage({
      message: errMessage,
      type: 'danger',
    })
    // Sentry.captureException(response);
  }
  if (cb) cb()
  yield put(HandleResponseErrorActions.handleResponseErrorSuccess())
 
}
