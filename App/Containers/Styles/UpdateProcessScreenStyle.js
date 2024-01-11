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
    shadowColor: '#000',
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
  rowTitle : {
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

  

  rowSubtitle : {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.screenWidth / 20,
    paddingVertical: Metrics.screenWidth / 30
  },
  subTitle: {
    fontSize: Metrics.screenWidth / 22.5,
    fontFamily: Fonts.type.varela,
  },
  rowInput: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingHorizontal: Metrics.screenWidth / 20,
  },

  //CARD ITEM
  containerItem: {
    flex: 1
  },
  rowCard: {
    display: 'flex',
    marginHorizontal: Metrics.screenWidth / 25,
    marginVertical: Metrics.screenWidth / 40,
    marginBottom: 0
  },
  containerCard: {
    backgroundColor: 'transparent',
    marginHorizontal: Metrics.screenWidth / -70
  },
  containerDataCard: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  columnDataCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  rowDataCard: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  titleItemCard: {
    fontSize: Metrics.screenWidth / 38,
    fontFamily: Fonts.type.openSansSemiBold,
    letterSpacing: .25,
    width: '25%',
  },
  checkbox: {
    // fontSize: Metrics.screenWidth / 38,
    // fontFamily: Fonts.type.openSansSemiBold,
    // letterSpacing: .25,
    paddingRight: Metrics.screenWidth / 30,
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

  //BUTTON
  rowButton: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Metrics.screenWidth / 40,
    paddingVertical: Metrics.screenWidth / 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    backgroundColor: Colors.whiteColor,
  },
  button: (isDisabled) => {
    return {
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: (isDisabled) ? 'grey' : Colors.primaryColor
    }
  },
  buttonBatal:{
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.redColor,
    // borderWidth: 2,
    // borderColor: Colors.redColor
  },
  txtBtn:{
    color: Colors.whiteColor,
    fontFamily: Fonts.type.varela,
    textAlign: 'center',
    fontSize: Metrics.screenWidth / 27.5,
    width: '100%'
  }
})