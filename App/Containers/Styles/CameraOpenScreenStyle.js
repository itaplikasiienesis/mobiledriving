import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    height: 0
  },
  rowTitle : {
    display: 'flex',
  },
  title: {
    fontSize: Metrics.screenWidth / 17.5,
    fontFamily: Fonts.type.varela,
    color: Colors.primaryColor
  },
  rowImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.screenWidth / 25,
    paddingBottom: 0
  },
  Image: {
    width: Metrics.screenWidth / 1.5,
    height: Metrics.screenHeight/ 3.5
  },
  rowSubTitle : {
    display: 'flex',
    paddingHorizontal: Metrics.screenWidth / 20,
  },
  subTitle: {
    fontSize: Metrics.screenWidth / 30,
    fontFamily: Fonts.type.varela,
    color: Colors.greyColor,
    textAlign: 'center'
  },
  rowButton : {
    display: 'flex',
    paddingHorizontal: Metrics.screenWidth / 15,
    paddingVertical: Metrics.screenWidth / 25
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
  textTerms: {
    color: Colors.greyColor,
    fontSize: Metrics.screenWidth / 33,
    textAlign: 'center',
    paddingLeft: 10,
    fontFamily: Fonts.type.varela
  }
})
