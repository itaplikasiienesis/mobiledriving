import { createStackNavigator } from 'react-navigation-stack' 
// import MainTabNavigator from './MainTabNavigator'
import styles from './Styles/NavigationStyles'
import CameraOpenScreen from '../Containers/CameraOpenScreen'
import CameraScreen from '../Containers/CameraScreen'
import CameraDoneScreen from '../Containers/CameraDoneScreen'

const CameraStackNavigator = createStackNavigator({
//INI LOGGED STACK
  CameraOpenScreen:  { screen: CameraOpenScreen },
  CameraScreen:  { screen: CameraScreen },
  CameraDoneScreen:  { screen: CameraDoneScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'CameraOpenScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default CameraStackNavigator