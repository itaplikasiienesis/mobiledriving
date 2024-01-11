import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    // display: 'flex',
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  header: {
    height: 0
  },
  rowButton : {
    flex: 0.2,
    justifyContent: 'center',
    // display: 'flex',
    // position: 'absolute',
    // bottom: 0,
    backgroundColor: Colors.primaryColor,
    // width: Metrics.screenWidth / 1,
    // paddingVertical: Metrics.screenWidth / 10
  },
  textButton: {
    color: Colors.whiteColor,
    textAlign: 'center',
    width: '100%'
  }
})
