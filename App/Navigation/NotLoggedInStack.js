import { createStackNavigator } from 'react-navigation-stack'
import LoginScreen from '../Containers/LoginScreen' 
import WelcomeScreen from '../Containers/WelcomeScreen'  

import styles from './Styles/NavigationStyles'
// Manifest of possible screens
const NotLoggedInNav = createStackNavigator({
  WelcomeScreen: { screen: WelcomeScreen }, 
  LoginScreen: { screen: LoginScreen },  
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'WelcomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default NotLoggedInNav