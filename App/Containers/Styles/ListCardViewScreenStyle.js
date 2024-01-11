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

  rowSubtitle: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.screenWidth / 20,
    paddingVertical: Metrics.screenWidth / 50,
    // paddingTop: Metrics.screenWidth / 30,
    // paddingBottom: Metrics.screenWidth / 50
  },
  subTitle: {
    fontSize: Metrics.screenWidth / 22.5,
    fontFamily: Fonts.type.varela,
  },


  containerCard: {
    backgroundColor: 'transparent',
    marginHorizontal: Metrics.screenWidth / -70
  },

  //CARD ITEM TITLE
  containerTitleCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    // marginTop: Metrics.screenWidth / -70,
    // alignItems: 'center',
  },
  titleCard: {
    fontSize: Metrics.screenWidth / 25,
    fontFamily: Fonts.type.varela,
    letterSpacing: .25,
    marginTop: Metrics.screenHeight / -300
  },

  //CARD SECOND ITEM
  containerSecondCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: Metrics.screenHeight / -35,
    alignItems: 'center',
  },

  rowCard2: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 25,
    marginVertical: Metrics.screenWidth / 40,
    marginBottom: 0
  },

  //CARD ITEM
  containerItem: {
    flex: 1
    // display: 'flex',
    // flexDirection: 'column'
  },
  rowCard: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 25,
    marginBottom: Metrics.screenWidth / 40,
  },
  containerDataCard: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginTop: Metrics.screenWidth / -20,
  },
  rowDataCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  titleItemCard: {
    fontSize: Metrics.screenWidth / 38,
    fontFamily: Fonts.type.openSansSemiBold,
    letterSpacing: .25,
    width: '25%',
  },
  titleItemCard2: {
    fontSize: Metrics.screenWidth / 38,
    fontFamily: Fonts.type.openSansSemiBold,
    letterSpacing: .25,
    textAlign: 'center',
    width: '5%',
  },
  dataItemCard: {
    fontSize: Metrics.screenWidth / 35,
    fontFamily: Fonts.type.varela,
    width: '70%',
  },

  //CARD BUTTON
  containerBtnCard: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    marginTop: Metrics.screenWidth / -30,
  },
  containerBtnCard2: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    // marginTop: Metrics.screenWidth / -30,
  },
  rowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  colBtn: {
    width: '32%'
  },
  colBtn2: {
    width: '49%'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    borderRadius: Metrics.screenWidth / 50,
    paddingHorizontal: Metrics.screenWidth / 50
  },
  txtBtn: {
    color: Colors.whiteColor,
    fontFamily: Fonts.type.varela,
    textAlign: 'center',
    fontSize: Metrics.screenWidth / 30,
    width: '100%'
  }

})
