/* eslint-disable no-undef */
/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the Infinite Red Slack channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put, select, take } from 'redux-saga/effects'
import DeliveryOrderActions from '../Redux/DeliveryOrderRedux'
import OverlaySpinnerActions from '../Redux/OverlaySpinnerRedux'
import OverlayAlertActions, {OverlayAlertTypes} from '../Redux/OverlayAlertRedux'
import {Alert} from 'react-native'
import { Toast } from 'native-base'
import { DeliveryOrderSelectors } from '../Redux/DeliveryOrderRedux'
import UpdateArrayData from 'update-state-array-data' 
import GetCurrentLocation from '../Lib/GetCurrentLocation'
import _ from 'lodash'
import images from '../Themes/Images'
 

export function * deliveryOrderRequest (api, action) {
  const { data } = action
  // get current data from Store
  // const currentData = yield select(DeliveryOrderSelectors.getData)
  // make the call to the api
  const response = yield call(api.deliveryOrderRequest, data)
  // console.log(JSON.stringify(response))
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(DeliveryOrderActions.deliveryOrderSuccess(response.data.results))
  } else {
    yield put(DeliveryOrderActions.deliveryOrderFailure())
  }
}

export function * deliveryOrderBundleRequest (api, action) {
  const { databundle } = action
  
  const response = yield call(api.deliveryOrderBundleRequest, databundle)
  // console.log(JSON.stringify(response))
  // success?
  if (response.ok) {
    console.log('deliveryOrderBundleRequest', response.data)
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(DeliveryOrderActions.deliveryOrderBundleSuccess(response.data.results))
  } else {
    yield put(DeliveryOrderActions.deliveryOrderBundleFailure())
  }
}

export function * deliveryOrderChangeStatusRequest (api, action) {
  const { datacs, statustext } = action

  yield put(OverlayAlertActions.overlayAlertSetShow(true, 'Aplikasi ini Membutuhkan Lokasi Anda Untuk Dikirim ke Server sebagai bukti. Klik OK Untuk Setuju', images.locationreq))
 
  const isConfirm = yield take([OverlayAlertTypes.OVERLAY_ALERT_SELECTED]);

  if (isConfirm && isConfirm.ispositive) {
    //IS OK 
    yield put(OverlayAlertActions.overlayAlertSetShow(false))
  } else {
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    Alert.alert('Info', 'Mohon Maaf Fitur ini Membutuhkan Izin Lokasi Anda Sebagai bukti..')
    return
  }


  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Memeriksa Lokasi Anda...'))
  const currentLocation = yield call(GetCurrentLocation, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  console.log(currentLocation)
  if (!currentLocation) {
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    return
  }

  const latitude = currentLocation.position.latitude
  const longitude = currentLocation.position.longitude

  console.log('latitude', 'longitude',latitude, longitude)
 

  if ((!latitude) || (!longitude)) {
    Toast.show({
      text: 'Gagal Mendapatkan lokasi anda saat ini, cek GPS dan coba lagi',
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Harap Tunggu Sebentar...'))
  // get current data from Store
  const currentData = yield select(DeliveryOrderSelectors.getPayload)
  // make the call to the api
  console.log('akan melakukan koneksi ke serverr',JSON.stringify( {...datacs, latitude, longitude}))
  const response = yield call(api.deliveryOrderChangeStatusRequest, {...datacs, latitude, longitude})
  console.log('response dr server', response)

  // console.log(response)
  // success?
  if (response.ok) {
    // Local Change
    const newData = UpdateArrayData(currentData, 'delivery_order_id', datacs.delivery_order_id, statustext) //array, key, modif data with
    console.log('newData', JSON.stringify(newData))
    yield put(DeliveryOrderActions.deliveryOrderSuccess(newData))
    //END Local Change
    Toast.show({
      text: response.data.message ? response.data.message : 'Berhasil Merubah Status',
      type: 'success',
      duration: 2000
    })
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusSuccess(response.data.message))
  } else {
    let err = 'Gagal Set Status'
    if (response.data && response.data.meta) {
      err = response.data.meta
    }
    Toast.show({
      text: err,
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
  }
  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
}

export function * deliveryOrderArrivedRequest (api, action) {
  const { dataarrived } = action

  yield put(OverlayAlertActions.overlayAlertSetShow(true, 'Aplikasi ini Membutuhkan Lokasi Anda Untuk Dikirim ke Server sebagai bukti. Klik OK Untuk Setuju', images.locationreq))
 
  const isConfirm = yield take([OverlayAlertTypes.OVERLAY_ALERT_SELECTED]);

  if (isConfirm && isConfirm.ispositive) {
    //IS OK 
    yield put(OverlayAlertActions.overlayAlertSetShow(false))
  } else {
    yield put(DeliveryOrderActions.deliveryOrderArrivedFailure())
    Alert.alert('Info', 'Mohon Maaf Fitur ini Membutuhkan Izin Lokasi Anda Sebagai Bukti..')
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Memeriksa Lokasi Anda...'))
  const currentLocation = yield call(GetCurrentLocation, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  
  if (!currentLocation) {
    // yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    yield put(DeliveryOrderActions.deliveryOrderArrivedFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  const latitude = currentLocation.position.latitude
  const longitude = currentLocation.position.longitude

  console.log('latitude', 'longitude',latitude, longitude)

  if ((!latitude) || (!longitude)) {
    Toast.show({
      text: 'Gagal Mendapatkan lokasi anda saat ini, cek GPS dan coba lagi',
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Harap Tunggu Sebentar...'))


  console.log('dataarrived', dataarrived)
  const formdata = new FormData()  
  formdata.append('latitude', latitude)
  formdata.append('longitude', longitude)
  for (const key in dataarrived) {
    console.log('-->', key,  dataarrived[key])
    formdata.append(key, dataarrived[key]) 
  }  

  const response = yield call(api.deliveryOrderArrivedRequest, formdata)
  console.log('res img', JSON.stringify(response))
  // success?
  if (response.ok) {    
    // Local Change
    const currentData = yield select(DeliveryOrderSelectors.getPayload)
    const newData = UpdateArrayData(currentData, 'delivery_order_id', dataarrived.delivery_order_id, {status: 'Driver Telah Sampai lokasi', kode_status: 'SPL', issampailokasi: 'N', isfinish: 'Y'}) //array, key, modif data with
    console.log('newData', JSON.stringify(newData))
    yield put(DeliveryOrderActions.deliveryOrderSuccess(newData))

    Toast.show({
      text: response.data.message ? response.data.message : 'Berhasil Merubah Status',
      type: 'success',
      duration: 2000
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedSuccess(response.data.results))
  } else {
    let err = 'Gagal Set Status'
    if (response.data && response.data.meta) {
      err = response.data.meta
    }
    Toast.show({
      text: err,
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedFailure())
  }
  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
}

export function * deliveryOrderPushMultipleRequest (api, action) {
  const { datapushmultiple } = action

  // yield put(OverlayAlertActions.overlayAlertSetShow(true, 'Aplikasi ini Membutuhkan Izin untuk menggunakan Lokasi Anda. Klik OK Untuk Setuju.', images.locationreq))
 
  // const isConfirm = yield take([OverlayAlertTypes.OVERLAY_ALERT_SELECTED]);

  // if (isConfirm && isConfirm.ispositive) {
  //   //IS OK 
  //   yield put(OverlayAlertActions.overlayAlertSetShow(false))
  // } else {
  //   yield put(DeliveryOrderActions.deliveryOrderPushMultipleFailure())
  //   Alert.alert('Info', 'Mohon Maaf Fitur ini Membutuhkan Izin Lokasi Anda..')
  //   return
  // }
  
  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Memeriksa Lokasi Anda...'))
  const currentLocation = yield call(GetCurrentLocation, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  console.log(currentLocation)
  if (!currentLocation) {
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    return
  }

  const latitude = currentLocation.position.latitude
  const longitude = currentLocation.position.longitude

  console.log('latitude', 'longitude',latitude, longitude)

  if ((!latitude) || (!longitude)) {
    Toast.show({
      text: 'Gagal Mendapatkan lokasi anda saat ini, cek GPS dan coba lagi',
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Harap Tunggu Sebentar...'))

  console.log('BEFORE SEND', {...datapushmultiple, latitude, longitude})
  const response = yield call(api.deliveryOrderPushMultipleRequest, {...datapushmultiple, latitude, longitude})
  console.log(JSON.stringify(response))
  // success?
  if (response.ok && !response.data.error) {  
    
    const currentDataArray = yield select(DeliveryOrderSelectors.getPayload)
    const currentDataObject = _.keyBy(currentDataArray, 'delivery_order_id')
    const responseDataObject = _.keyBy(response.data.data, 'delivery_order_id')
  
    const merge = _.merge(currentDataObject, responseDataObject)
    const newDataDO = _.values(merge)

    yield put(DeliveryOrderActions.deliveryOrderSuccess(newDataDO))
    
    Toast.show({
      text: response.data.message,
      type: 'success',
      duration: 2000
    })

    yield put(DeliveryOrderActions.deliveryOrderPushMultipleSuccess(response.data))
  } else {
    let err = 'Gagal Set Status'
    if (response.data && response.data.meta) {
      err = response.data.meta
    }
    Toast.show({
      text: err,
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderPushMultipleFailure())
  }
  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
}

export function * deliveryOrderArrivedBundleRequest (api, action) {
  const { dataarrived } = action

  yield put(OverlayAlertActions.overlayAlertSetShow(true, 'Aplikasi ini Membutuhkan Lokasi Anda Untuk Dikirim ke Server sebagai bukti. Klik OK Untuk Setuju', images.locationreq))
 
  const isConfirm = yield take([OverlayAlertTypes.OVERLAY_ALERT_SELECTED]);

  if (isConfirm && isConfirm.ispositive) {
    //IS OK 
    yield put(OverlayAlertActions.overlayAlertSetShow(false))
  } else {
    yield put(DeliveryOrderActions.deliveryOrderArrivedBundleFailure())
    Alert.alert('Info', 'Mohon Maaf Fitur ini Membutuhkan Izin Lokasi Anda Sebagai Bukti..')
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Memeriksa Lokasi Anda...'))
  const currentLocation = yield call(GetCurrentLocation, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 })
  
  if (!currentLocation) {
    yield put(DeliveryOrderActions.deliveryOrderChangeStatusFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  const latitude = currentLocation.position.latitude
  const longitude = currentLocation.position.longitude

  console.log('latitude', 'longitude',latitude, longitude)

  if ((!latitude) || (!longitude)) {
    Toast.show({
      text: 'Gagal Mendapatkan lokasi anda saat ini, cek GPS dan coba lagi',
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedBundleFailure())
    yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
    return
  }

  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(true, 'Harap Tunggu Sebentar...'))


  console.log('dataarrived', dataarrived)
  const formdata = new FormData()  
  formdata.append('latitude', latitude)
  formdata.append('longitude', longitude)
  for (const key in dataarrived) {
    console.log('-->', key,  dataarrived[key])
    formdata.append(key, dataarrived[key]) 
  }  

  const response = yield call(api.deliveryOrderArrivedBundleRequest, formdata)
  console.log('res img bundle', JSON.stringify(response))
  // success?
  if (response.ok && !response.data.error) {    
    // Local Change
    const currentDataArray = yield select(DeliveryOrderSelectors.getPayload)
    // const newData = UpdateArrayData(currentData, 'delivery_order_id', dataarrived.delivery_order_id, {status: 'Driver Telah Sampai lokasi', kode_status: 'SPL', issampailokasi: 'N', isfinish: 'Y'}) //array, key, modif data with
    // console.log('newData', JSON.stringify(newData))
    // yield put(DeliveryOrderActions.deliveryOrderSuccess(newData))

    const currentDataObject = _.keyBy(currentDataArray, 'delivery_order_id')
    const responseDataObject = _.keyBy(response.data.data, 'delivery_order_id')
  
    const merge = _.merge(currentDataObject, responseDataObject)
    const newDataDO = _.values(merge)

    yield put(DeliveryOrderActions.deliveryOrderSuccess(newDataDO))

    Toast.show({
      text: response.data.message,
      type: 'success',
      duration: 2000
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedBundleSuccess(response.data))
  } else {
    let err = 'Gagal Set Status'
    if (response.data && response.data.meta) {
      err = response.data.meta
    }
    Toast.show({
      text: err,
      type: 'danger',
      duration: 3100
    })
    yield put(DeliveryOrderActions.deliveryOrderArrivedBundleFailure())
  }
  yield put(OverlaySpinnerActions.overlaySpinnerSetFetching(false))
}