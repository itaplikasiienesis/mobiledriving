import BackgroundGeolocation from 'react-native-geolocation-service'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'
import { showMessage } from 'react-native-flash-message'
import { Platform, Alert } from 'react-native'
import {checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions' 

export default async (options, issafe = true) => { 

  //Minta Permisi disini
  const platform = Platform.select({
    android: [  
      PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION    
    ],
    ios: [
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    ],
  })

  const results = await requestMultiple(platform)
  console.log('PERMISSION RESULT', results)
  
  let permissionstatus = '';
  if (results[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === "granted" && results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted") {
    permissionstatus = 'granted';
  } else if (results[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION] === "blocked" && results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "blocked") {
    permissionstatus = 'blocked';
    Alert.alert("Izin di blok", "Izin Telah di blok. Silahkan Pergi ke pengaturan Handphone anda dan mengaktifkannya.")
  } else {
    Alert.alert("Info", "Maaf, Izin Lokasi Diperlukan untuk Fitur ini.")
  }

  if (permissionstatus !== 'granted') {
    return null;
  }
 
  if (Platform.OS === 'android') {
    if (issafe) {
      try {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
      } catch(e) {
        showMessage({
          message: 'Jaringan GPS diperlukan untuk melakukan absen !',
          type: 'danger',
          duration: 3500
        })
        return null
      }
    }
  }

  const geolocation = await getCurrentPositionPromise(options) //sample param options { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }

  if (!geolocation.success) {
    showMessage({
      message: 'Gagal Mendapatkan Lokasi anda saat ini. \nHarap Coba Lagi, Pastikan GPS anda Aktif',
      type: 'danger',
      duration: 3500
    })
 
    return null
  }

  if (geolocation.position.isFromMockProvider === true) {
    showMessage({
      message: 'Lokasi anda bukan lokasi yang sesungguhnya',
      type: 'danger',
      duration: 3500
    })
 
    return null
  }

  return geolocation
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