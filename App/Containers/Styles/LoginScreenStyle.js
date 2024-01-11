import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    height: 0
  },
  rowLogo: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 15,
    marginVertical: Metrics.screenWidth / 20,
  },
  logo: {
    width: Metrics.screenWidth / 4,
    height: Metrics.screenWidth / 5,
  },
  containerContent: {
    position: 'absolute',
    justifyContent: 'center',
    // alignItems: 'center',
    top: 0,
    height: '100%'
  },
  rowTitle : {
    paddingHorizontal: Metrics.screenWidth / 15,
    paddingVertical: Metrics.screenWidth / 50,
  },
  title: {
    fontSize: Metrics.screenWidth / 20,
    fontFamily: Fonts.type.varela,
    textAlign: 'left'
  },
  rowImage: {
    paddingVertical: Metrics.screenWidth / 30,
    alignItems: 'center'
  },
  Image: {
    width: Metrics.screenWidth / 2,
    height: Metrics.screenHeight/ 4
  },
  rowInput: {
    paddingHorizontal: Metrics.screenWidth / 15,
    width: '100%'
  },
  rowIconPassword: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.screenWidth / 50,
    marginTop: Metrics.screenHeight / -12.5,
    marginBottom: Metrics.screenHeight / 30,
  },
  rowButton : {
    paddingHorizontal: Metrics.screenWidth / 15,
    paddingVertical: Metrics.screenWidth / 30,
  },
  button: {
    backgroundColor: Colors.primaryColor,
  },
  textButton: {
    color: Colors.whiteColor,
    fontFamily: Fonts.type.varela,
    textAlign: 'center',
    fontSize: Metrics.screenWidth / 27.5,
    width: '100%'
  },
})
