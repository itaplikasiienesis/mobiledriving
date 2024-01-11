import { createSwitchNavigator, createAppContainer } from 'react-navigation'  
import LaunchScreen from '../Containers/LaunchScreen' 
import NotLoggedInStack from './NotLoggedInStack'
import LoggedInStack from './LoggedInStack' 

import styles from './Styles/NavigationStyles'

//INI GERBANG PERTAMA KALI DI EKSEKUSI

// Manifest of possible screens
const PrimaryNav = createSwitchNavigator({  
  //DEFAULT ENTRY POINT
  LaunchScreen: { 
    screen: LaunchScreen  //sama dengan splash
    // screen: TestScreen
  },
  //ENTRY POINT WITHOUT LOGIN SESSION
  NotLoggedInStack: { screen: NotLoggedInStack }, // Login / Register , dll
  //ENTRY POINT WITH LOGIN SESSION
  LoggedInStack: { screen: LoggedInStack },  
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
