import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    display: 'flex',
    flex: 1,
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
  rowImage: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '100%'
  },
  Image: {
    width: Metrics.screenWidth / 1.5,
    height: Metrics.screenHeight/ 3
  },
  rowTitle : {
    display: 'flex',
    marginBottom: Metrics.screenWidth / 15,
  },
  title: {
    fontSize: Metrics.screenWidth / 12.5,
    fontFamily: Fonts.type.varela,
  },
  rowSubTitle : {
    display: 'flex',
  },
  subTitle: {
    fontSize: Metrics.screenWidth / 25,
    fontFamily: Fonts.type.varela,
    color: Colors.primaryColor
  },
  rowBottom : {
    position: 'absolute',
    bottom: 0,
    padding: Metrics.screenWidth / 10
  },
  rowButton : {
    display: 'flex'
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
