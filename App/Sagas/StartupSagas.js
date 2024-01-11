import { call } from 'redux-saga/effects'
// import GithubActions, { GithubSelectors } from '../Redux/GithubRedux'
// import { is } from 'ramda'
import {PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions'
import { Platform } from 'react-native' 

// exported to make available for tests
// export const selectAvatar = GithubSelectors.selectAvatar

async function checkPermission() {
  // const result = await request(
  //   Platform.select({
  //     android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  //     ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  //   })
  // )
  const platform = Platform.select({
    android: [ 
      PERMISSIONS.ANDROID.CAMERA, 
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    ],
    ios: [
      PERMISSIONS.IOS.CAMERA, 
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ],
  })

  const results = await requestMultiple(platform)
  console.log('PERMISSION RESULT', results)
  return results
}

// process STARTUP actions
export function * startup (action) { 
  console.log('STARTUP GAN')
  //yield call(checkPermission) 
}


// const requestPermission = async () => {
//   try {
//     const granted1 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
//     const granted2 = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)

//     if (granted1 === PermissionsAndroid.RESULTS.GRANTED && granted2 === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('Granted');
//     } else {
//       console.log('permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// // process STARTUP actions
// export function * startup (action) {
//   console.log('STATUIP GAN')
//   yield call(requestPermission)
// }
