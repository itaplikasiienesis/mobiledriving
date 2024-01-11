// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import {Toast} from 'native-base';
import StaticVar from '../Config/StaticVar' 
import {store} from '../Containers/App';
import AuthActions from '../Redux/AuthRedux';
import AsyncStorageHelper from '../Lib/AsyncStorageHelper';

// our "constructor"
const create = (baseURL = StaticVar.HostUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      // 'Content-Type': 'multipart/form-data'
    },
    // 10 second timeout...
    timeout: 23000
  })

  // api.addAsyncRequestTransform( async (request) => {
  //   // let session = await AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject()
  //   const session = await AsyncStorageHelper(StaticVar.DB_KEY_USER).getDataObject()
  //   // console.log('sessionnya di api', JSON.stringify(session));
    
  //   if (session) {
  //     if (session.token) {
  //       // console.log('sessionnya di api', JSON.stringify(session));
  //       request.headers['x-access-token'] = session.token.split(' ')[1]

  //     } 
  //   }
  // })

  // api.addRequestTransform((transform) => {
  //   transform.data = json2formdata(transform.data)
  //   console.log('transss', transform)
  // })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  
  api.addAsyncRequestTransform(async request => {
    // console.log('apijsrequest', request);
    let session = await AsyncStorageHelper(
      StaticVar.DB_KEY_SESSION,
    ).getDataObject(); 
    console.log('addAsyncRequestTransform session', session)

    // const token = session && session.token ? session.token : ''; 
    // request.headers['Authorization'] = `Bearer ${token}`;  
  });

  api.addResponseTransform(async response => { 
    console.log('addResponseTransform response',response);
    if (!response.ok && response.data) { 
      if (response.status === 401) { 
        //access denied, kick ke login
        store.dispatch(AuthActions.authSessionEnded());
        return;
      }

      if (response.status !== 400) {
        Toast.show({
          text: response.data.message,
          position: 'bottom',
          type: 'danger',
          duration: 4000,
          swipeDisabled: false,
          textStyle: toastStyle.textStyle,
          style: toastStyle.style,
        });
      } else if (response.status === 400) {
        Toast.show({
          text: response.data.message,
          type: 'danger',
          duration: 4000,
          swipeDisabled: false,
          position: 'bottom',
          textStyle: styles.textStyle,
          style: styles.style,
        });
      } else {
        Toast.show({
          text: 'Unknown Error From Backend',
          type: 'danger',
          duration: 4000,
          swipeDisabled: false,
          position: 'bottom',
          textStyle: styles.textStyle,
          style: styles.style,
        });
      }
    }

    if (
      !response.ok &&
      response.problem &&
      response.problem === 'TIMEOUT_ERROR'
    ) {
      Toast.show({
        text: 'Gagal Terkoneksi ke server, harap coba lagi',
        type: 'danger',
        duration: 3500,
        position: 'bottom',
        swipeDisabled: false,
        textStyle: styles.textStyle,
        style: styles.style,
      });
    }

    if (
      !response.ok &&
      response.problem &&
      response.problem === 'NETWORK_ERROR'
    ) {
      Toast.show({
        text: 'Tidak dapat terhubung ke server',
        type: 'danger',
        duration: 3500,
        position: 'bottom',
        swipeDisabled: false,
        textStyle: styles.textStyle,
        style: styles.style,
      });
    }
  });



  // const getRoot = () => api.get('')
  // const getRate = () => api.get('rate_limit')
  // const getUser = (username) => api.get('search/users', {q: username})
  // const getRate = () => api.get('rate_limit')0
  // const orderRequest = (id) => api.get(`shipment/driver/${id ? id : ''}`) //5C2AB5A5-2BC8-4CAD-93B7-4B03B83B731C
  const authRequest = (data) => api.post('login', data)  
  const authSessionCheck = (data) => api.post('acces-token', data)  

  /////register
  const getEmployeeById  = (data) => api.get('ceknik', data)
  const registrationRequest  = (data) => api.post('register/employee', data)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    authRequest,
    authSessionCheck,
    // authLogoutRequest,
    getEmployeeById,
    registrationRequest,
    // getRoot,
    // getRate,
    // getUser
    // orderRequest,
  }
}

// let's return back our create method as the default.
export default {
  create
}
