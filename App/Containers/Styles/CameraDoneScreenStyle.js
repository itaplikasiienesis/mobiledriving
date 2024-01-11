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


  rowCard: {
    display: 'flex',
    margin: Metrics.screenWidth / 25
  },
  rowImage: {
    display: 'flex',
    width: '100%',
    height: Metrics.screenHeight / 3,
    backgroundColor: Colors.greyColor,
    borderRadius: Metrics.screenWidth / 30
  },


  //BUTTON CARD
  rowButtonCard: {
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: Metrics.screenWidth / -30,
    // paddingHorizontal: Metrics.screenWidth / 40,
    // paddingVertical: Metrics.screenWidth / 40,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 10,
    // backgroundColor: Colors.whiteColor,
  },
  buttonSave:{
    width: '47.5%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
  },
  buttonRetake:{
    flex: 1,
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
  },


  //BUTTON CARD
  rowButton: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
