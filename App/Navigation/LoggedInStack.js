import { createStackNavigator } from 'react-navigation-stack' 
// import MainTabNavigator from './MainTabNavigator'
import styles from './Styles/NavigationStyles'
import HomeDashboardScreen from '../Containers/HomeDashboardScreen'
import ListCardViewScreen from '../Containers/ListCardViewScreen'
import DetailCardOrderScreen from '../Containers/DetailCardOrderScreen'
import DeliveryScreen from '../Containers/DeliveryScreen'
import UpdateProcessScreen from '../Containers/UpdateProcessScreen'
import DetailOrderScreen from '../Containers/DetailOrderScreen'
import DeliveryConfirmationScreen from '../Containers/DeliveryConfirmationScreen'
import CameraStackNavigator from './CameraStackNavigator'

const LoggedInNav = createStackNavigator({
//INI LOGGED STACK
  ListCardViewScreen:  { screen: ListCardViewScreen },
  HomeDashboardScreen:  { screen: HomeDashboardScreen },
  DetailCardOrderScreen:  { screen: DetailCardOrderScreen },
  DeliveryScreen:  { screen: DeliveryScreen },
  UpdateProcessScreen:  { screen: UpdateProcessScreen },
  DetailOrderScreen:  { screen: DetailOrderScreen },
  DeliveryConfirmationScreen:  { screen: DeliveryConfirmationScreen },
  CameraStackNavigator: { screen: CameraStackNavigator }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'ListCardViewScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default LoggedInNav