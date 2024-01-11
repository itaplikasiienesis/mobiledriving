import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Container, Button, Header } from 'native-base';
// import images from '../Themes/Images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { RNCamera } from 'react-native-camera'

// Styles
import styles from './Styles/CameraScreenStyle'
import { Metrics } from '../Themes';

class CameraScreen extends Component {
 
  async takePicture() {
    // alert('s')
    if (this.camera) {
      const options = { quality: 0.4, base64: false, orientation: 'portrait' /*, fixOrientation : true */};
      // this.setState({ procImg: true })
      // const data = await 
      this.camera.takePictureAsync(options).then(data => {
        console.log('POTO DI AMBIL', data)
        this.props.navigation.navigate('CameraDoneScreen', {photo: data, do: this.props.navigation.getParam('data'), isBundle: this.props.navigation.getParam('isBundle') })
      })      
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 0.8}}
          // type={RNCamera.Constants.Type.front}
          // flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
        />
        <TouchableOpacity style={styles.rowButton} onPress={() => this.takePicture() }>
          <Ionicons name="ios-camera" size={Metrics.screenHeight / 15} style={styles.textButton} />
        </TouchableOpacity>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen)

/*this.props.navigation.navigate('CameraDoneScreen')*/