import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  header: {
    height: 0
  },

  rowLogo: {
    display: 'flex',
  },
  logo: {
    width: Metrics.screenWidth / 1.75,
    height: Metrics.screenHeight/ 3.75
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
})
