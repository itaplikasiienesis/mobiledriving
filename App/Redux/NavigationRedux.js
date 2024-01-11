import { StackActions, SwitchActions, NavigationActions } from 'react-navigation'
import AppNavigation from '../Navigation/AppNavigation'

const GO_LOGGEDIN = (state) => {     

  const jumpAction = SwitchActions.jumpTo({ routeName: 'LoggedInStack' })
  return AppNavigation.router.getStateForAction(jumpAction, state) 
}

const GO_NOT_LOGGEDIN = (state) => {   
  const jumpAction = SwitchActions.jumpTo({ routeName: 'NotLoggedInStack' })
  return AppNavigation.router.getStateForAction(jumpAction, state) 
}

const GOBACK = (state) => {   
  const popAction = StackActions.pop({
    n: 1,
  }) 
  return AppNavigation.router.getStateForAction(popAction, state) 
}  

const HAS_ARRIVED = (state) => {   
  const popAction = NavigationActions.navigate({ routeName: 'ListCardViewScreen' })
  return AppNavigation.router.getStateForAction(popAction, state) 
}  


 
 
// const REGISTRATION_FAILURE_BACK = (state) => {   
//   const popAction = StackActions.pop({
//     n: 4,
//   }) 
//   return AppNavigation.router.getStateForAction(popAction, state) 
// }   
  
//** 
//* fungsi ini (getRouteName) dibuat untuk mendapatkan current screen name, contoh penggunaan untuk mengecek bila screen sekarang sama dengan screen yg akan di tuju, maka abaikan navigasi karena sudah berada di screen yg di tuju
//*/ 
//** 
//* fungsi ini (getRouteName) dibuat untuk mendapatkan current screen name, contoh penggunaan untuk mengecek bila screen sekarang sama dengan screen yg akan di tuju, maka abaikan navigasi karena sudah berada di screen yg di tuju
//*/ 
function getRouteName(state) {
  if (state.index > 0) {
    return getRouteName(state.routes[state.index])
  } else {
    return state.routeName
  }
}

export const reducer = (state, action) => {
  // console.log('action', action)
  switch (action.type) {
  case 'AUTH_SUCCESS':
    return GO_LOGGEDIN(state)  
  case 'AUTH_FAILURE':
    return GO_NOT_LOGGEDIN(state)
  case 'AUTH_LOGOUT_SUCCESS':
    return GO_NOT_LOGGEDIN(state) 
  case 'DELIVERY_ORDER_ARRIVED_SUCCESS':
    return HAS_ARRIVED(state)
  case 'DELIVERY_ORDER_PUSH_MULTIPLE_SUCCESS':
    return GOBACK(state) 
  case 'DELIVERY_ORDER_ARRIVED_BUNDLE_SUCCESS':
    return HAS_ARRIVED(state)   
    
  }
  

  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state
} 
 