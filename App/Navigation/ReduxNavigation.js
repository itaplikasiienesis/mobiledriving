import * as React from 'react'
import { BackHandler, Platform, Alert } from 'react-native'
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'

export const appNavigatorMiddleware = createReactNavigationReduxMiddleware(
  (state) => state.nav,
  'root'
)

const ReduxAppNavigator = createReduxContainer(AppNavigation, 'root')

class ReduxNavigation extends React.Component {
  componentDidMount () {
    if (Platform.OS === 'ios') return
    BackHandler.addEventListener('hardwareBackPress', () => {
      const { dispatch, nav } = this.props

      console.log(JSON.stringify(nav))
      console.log('s', nav.routes[1].index)
      // change to whatever is your first screen, otherwise unpredictable results may occur
      if (nav.routes[1].index === 0 && nav.routes[2].index === 0 /*&& (nav.routes[2].routeName === 'WelcomeScreen')*/) {
        Alert.alert(   // Shows up the alert without redirecting anywhere
          'Konfirmasi'
          ,'Yakin Keluar Aplikasi?'
          ,[
            {text: 'Ya', onPress: () => { 
            // RNExit
              BackHandler.exitApp()
              return false
            }}, 
            {text: 'Batal', onPress: () => console.log('Cancel Pressed')}
          ]
        )
        return true
      }
      // if (shouldCloseApp(nav)) return false
      dispatch({ type: 'Navigation/BACK' })
      return true
    })
  }

  componentWillUnmount () {
    if (Platform.OS === 'ios') return
    BackHandler.removeEventListener('hardwareBackPress', undefined)
  }

  render () {
    return <ReduxAppNavigator dispatch={this.props.dispatch} state={this.props.nav} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})
export default connect(mapStateToProps)(ReduxNavigation)
