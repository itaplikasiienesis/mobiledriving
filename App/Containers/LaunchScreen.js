import { Container, Header } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import SampleLoginActions from '../Redux/SampleLoginRedux' 
import AwesomeAlert from 'react-native-awesome-alerts';
import {checkMultiple, PERMISSIONS, request, requestMultiple, RESULTS} from 'react-native-permissions' 

import AuthActions from '../Redux/AuthRedux';

// Styles
import { Colors, Metrics } from '../Themes';
import images from '../Themes/Images';
import styles from './Styles/LaunchScreenStyles';
// import ErrorNetworkButton from '../Components/ErrorNetworkButton' 


class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { showAlert: false, permissionIsClear: false };
  }

  componentDidMount() { 
    this.doSessionCheck()
    //this.showAlert();
  }
  
  // showAlert = () => {
  //   this.setState({
  //     showAlert: true
  //   });
  // };

  // hideAlert = () => {
  //   this.setState({
  //     showAlert: false
  //   });
  // };

  doSessionCheck() {
    // this.props.notificationServiceStart(() => {this.props.authSessionCheck()})

    // this.setState({
    //   showAlert: false
    // },() => {
      this.requestPermission().then(results => {
        console.log('results?: ',results)
        if (results[PERMISSIONS.ANDROID.CAMERA] === "granted" && 
          // results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted" && 
          results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" && 
          results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted" ) {
            this.setState({permissionIsClear: true, showAlert: false}, () => this.props.authSessionCheck())
          } else {
            this.setState({permissionIsClear: false}, () => {
              if (
                results[PERMISSIONS.ANDROID.CAMERA] === "blocked" ||
                // results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "blocked" ||
                results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "blocked" ||
                results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "blocked"
              ) {
                Alert.alert("Info", "Permission is Blocked. Please go to your phone setting, and enabling it")
              } else {
                Alert.alert("Info", "Sorry all permission all required.")
              }
            })
            // this.requestPermission().then(results => {
            //   if (results[PERMISSIONS.ANDROID.CAMERA] === "granted" && 
            //     results[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === "granted" && 
            //     results[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" && 
            //     results[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted" ) {
            //       this.setState({permissionIsClear: true}, () => this.props.authSessionCheck())
            //     } else {
            //       this.setState({permissionIsClear: false}, () => Alert.alert("Info", "Sorry all permission all required."))
            //     }
            // })
          }
          return false;
        //this.props.authSessionCheck()
      })
    // });
  }

  async checkPermission() {
    const platform = Platform.select({
      android: [ 
        PERMISSIONS.ANDROID.CAMERA, 
        // PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      ],
      ios: [
        PERMISSIONS.IOS.CAMERA, 
        // PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      ],
    })
  
    const results = await checkMultiple(platform)
    console.log('PERMISSION RESULT', results)
    return results
  }

  async requestPermission() {
    const platform = Platform.select({
      android: [ 
        PERMISSIONS.ANDROID.CAMERA, 
        // PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
      ],
      ios: [
        PERMISSIONS.IOS.CAMERA, 
        // PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      ],
    })
  
    const results = await requestMultiple(platform)
    console.log('PERMISSION RESULT', results)
    return results
  }

  render () {    
    const permissionIsClear = this.state.permissionIsClear
    const { fetching, error } = this.props.auth  
    console.log('permissionIsClear', permissionIsClear)
    console.log('show', this.state.showAlert)
    return ( 
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.rowLogo}>
          <Image source={images.logoApp} style={styles.logo} />
        </View>
        <View style={styles.rowSubTitle}>
        { (permissionIsClear === false) ?
          (fetching === true) ?
            <TouchableOpacity onPress={() => this.doSessionCheck() /*this.props.authSessionCheck()*/}>
                <Text style={styles.subTitle}>Connecting <Text style={styles.subTitle}>... </Text></Text>             
              </TouchableOpacity> 
            : (permissionIsClear === false) ?
                <TouchableOpacity onPress={() => this.doSessionCheck() /*this.props.authSessionCheck()*/}>
                    <Text style={styles.subTitle}>Click Here for Request Permission</Text>             
                  </TouchableOpacity> 
                :<ActivityIndicator style={Metrics.screenWidth/ 30} color={Colors.primaryColor} size="large" />
              : (error === true) ? 
                <TouchableOpacity onPress={() => this.doSessionCheck() /*this.props.authSessionCheck()*/}>
                  <Text style={styles.subTitle}>Gagal Terhubung ke Server <Text style={styles.subTitle}>... Ulangi ?</Text></Text>             
                </TouchableOpacity>
                : <TouchableOpacity onPress={() => this.doSessionCheck() /*this.props.authSessionCheck()*/}>
                  {/* <Text style={styles.subTitle}>Gagal Terhubung ke Server <Text style={styles.subTitle}>... Ulangi ?</Text></Text>              */}
                  <Text style={styles.subTitle}>Connecting <Text style={styles.subTitle}>... </Text></Text>    
                </TouchableOpacity>
        }
        </View>

        <View style={styles.container}> 
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title="Permission Info"
            message="This Application Require Location and Photo Permission for its main purpose. The data will be used for proof of delivery that you do. So Please turn on and accept the Location and Photo permission Request. Thankyou"
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true} 
            confirmText="Yes, I Understand"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              //this.hideAlert();
              this.doSessionCheck()
            }}
            onConfirmPressed={() => {
              //this.hideAlert();
              this.doSessionCheck()
            }}
          />
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // samplelogin: state.samplelogin
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // sampleLoginRequest: (data) => dispatch(SampleLoginActions.sampleLoginRequest(data)),
    authSessionCheck: () => dispatch(AuthActions.authSessionCheck()), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
