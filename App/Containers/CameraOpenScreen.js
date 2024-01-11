import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Icon, Container, Button, Header } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CameraOpenScreenStyle'
import { Colors, Metrics } from '../Themes';

class CameraOpenScreen extends Component {
  render() {
    const data = this.props.navigation.getParam('data')
    const isBundle = this.props.navigation.getParam('isBundle')    
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.rowTitle}>
          <Text style={styles.title}>Foto Pesanan Sampai Tujuan</Text>
        </View>
        <View style={styles.rowImage}>
          <Image source={images.camera_open} style={styles.Image} />
        </View>
        <View style={styles.rowSubTitle}>
          <Text style={styles.subTitle}>Dengan ada nya foto ini,</Text>
          <Text style={styles.subTitle}>akan akan menjadi bukti bahwa pesanan sudah sampai.</Text>
        </View>
        <View style={styles.rowButton}>
          <Button style={styles.button} rounded={true} onPress={() => this.props.navigation.navigate('CameraScreen', { data, isBundle })}>
            <Text style={styles.textButton}>Next</Text>
          </Button>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraOpenScreen)

