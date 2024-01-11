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

  //HEADER
  containerHeader: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
    // paddingBottom: Metrics.screenWidth / 50,
  },
  rowLogo: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 20,
    marginVertical: Metrics.screenWidth / 30,
    marginBottom: Metrics.screenWidth / -20
  },
  logo: {
    width: Metrics.screenWidth / 6,
    height: Metrics.screenWidth / 7,
  },
  rowTitle : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: Metrics.screenWidth / 20,
    fontFamily: Fonts.type.varela,
  },
  rowInfo : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.screenWidth / 30,
    paddingVertical: Metrics.screenWidth / 50
  },
  info: {
    fontSize: Metrics.screenWidth / 30,
    fontFamily: Fonts.type.varela,
  },
  info2: {
    fontSize: Metrics.screenWidth / 30,
    fontFamily: Fonts.type.varela,
    textAlign: 'right',
    color: Colors.primaryColor
  },


  rowSubtitle : {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.screenWidth / 20,
    paddingTop: Metrics.screenWidth / 30,
    paddingBottom: Metrics.screenWidth / 50
  },
  subTitle: {
    fontSize: Metrics.screenWidth / 22.5,
    fontFamily: Fonts.type.varela,
  },


  //CARD ITEM
  containerItem: {
    display: 'flex',
    flexDirection: 'column'
  },
  rowCard: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 25
  },
  containerDataCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    margin: Metrics.screenWidth / -70
  },
  rowDataCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  titleItemCard: {
    fontSize: Metrics.screenWidth / 38,
    fontFamily: Fonts.type.openSansSemiBold,
    letterSpacing: .25
  },
  dataItemCard: {
    fontSize: Metrics.screenWidth / 35,
    fontFamily: Fonts.type.varela,
  },


  //BUTTON
  rowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.screenWidth / 40,
    paddingVertical: Metrics.screenWidth / 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: Colors.whiteColor,
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  txtBtn:{
    color: Colors.whiteColor,
    fontFamily: Fonts.type.varela,
    textAlign: 'center',
    fontSize: Metrics.screenWidth / 27.5,
    width: '100%'
  }

})
