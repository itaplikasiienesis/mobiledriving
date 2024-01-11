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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.screenWidth / 20,
    paddingVertical: Metrics.screenWidth / 50,
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
    width: '30%',
  },
  logo: {
    width: Metrics.screenWidth / 6,
    height: Metrics.screenWidth / 7,
  },
  rowTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
  },
  title: {
    fontSize: Metrics.screenWidth / 20,
    fontFamily: Fonts.type.varela,
    textAlign: 'center'
  },
  back: {
    fontSize: Metrics.screenWidth / 27.5,
    fontFamily: Fonts.type.varela,
    textAlign: 'right',
    color: Colors.redColor,
    // textDecorationLine: 'underline',
  },


  //HEADER INFO
  rowInfo: {
    display: 'flex',
    marginTop: Metrics.screenWidth / -50,
    padding: Metrics.screenWidth / 25,
    paddingBottom: Metrics.screenWidth / 40,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: Colors.whiteColor,
  },
  containerDataInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
  },
  rowDataInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  titleInfo: {
    fontSize: Metrics.screenWidth / 30,
    fontFamily: Fonts.type.openSansSemiBold,
    letterSpacing: .25
  },
  dataInfo: {
    fontSize: Metrics.screenWidth / 30,
    fontFamily: Fonts.type.varela,
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



  //CARD LIST ITEM
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
    width: '100%',
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
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  buttonUpdate:{
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.whiteColor,
    borderWidth: 2,
    borderColor: Colors.primaryColor
  },
  txtBtn:{
    color: Colors.whiteColor,
    fontFamily: Fonts.type.varela,
    textAlign: 'center',
    fontSize: Metrics.screenWidth / 27.5,
    width: '100%'
  }

})
