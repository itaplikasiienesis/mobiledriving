import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DeliveryOrderActions from '../Redux/DeliveryOrderRedux'
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/CameraDoneScreenStyle'
import { Colors, Metrics } from '../Themes';



class CameraDoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const photo = this.props.navigation.getParam('photo')
    const itemPassed = this.props.navigation.getParam('do')
    const isBundle = this.props.navigation.getParam('isBundle')
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.containerHeader}>
          <View style={styles.rowLogo}>
            <Image source={images.logoApp} style={styles.logo} />
          </View>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Sampai Tujuan</Text>
          </View>
          <View style={styles.rowLogo}></View>
        </View>

        <View style={styles.rowCard}>
          <Card>
            <CardItem>
              <View style={styles.rowImage}>
                <Image
                  source={{ uri: photo.uri }}
                  style={[styles.btnCamera, { height: '100%', width: '100%', }]}
                />
              </View>
            </CardItem>
            <CardItem>
              <View style={styles.rowButtonCard}>
                <Button style={styles.buttonRetake} primary rounded={true} onPress={() => this.props.navigation.navigate('CameraScreen')}>
                  <Text style={[styles.txtBtn, { color: Colors.primaryColor }]}>Foto Ulang</Text>
                </Button>
                {/* <Button style={styles.buttonSave} primary rounded={true}>
                  <Text style={styles.txtBtn}>Save</Text>
                </Button> */}
              </View>
            </CardItem>
          </Card>
        </View>

        <View style={styles.rowButton}>
          <Button style={styles.button} primary rounded={true} onPress={() => {        
            if (isBundle) {
              const sendDataVersiBundleToServer = {
                m_user_id:this.props.auth.payload.m_user_id,
                data: JSON.stringify(itemPassed),
                file_do:'file_bukti_do_sampai_tujuan.jpg',
                file: 
                // photo
                {
                  uri: photo.uri,//.replace('file://', ''),
                  type: 'image/jpeg',
                  name: 'file_bukti_do_sampai_tujuan.jpg',
                } 
              }
              this.props.deliveryOrderArrivedBundleRequest(sendDataVersiBundleToServer)
            } else {
              const sendDataToServer = {
                m_user_id:this.props.auth.payload.m_user_id,
                delivery_order_id: itemPassed.delivery_order_id,
                file_do:'file_bukti_do_sampai_tujuan.jpg',
                file: 
                // photo
                {
                  uri: photo.uri,//.replace('file://', ''),
                  type: 'image/jpeg',
                  name: 'file_bukti_do_sampai_tujuan.jpg',
                } 
              }
              this.props.deliveryOrderArrivedRequest(sendDataToServer)
            }
            
          }}>
            <Text style={styles.txtBtn}>Selesai</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deliveryorder: state.deliveryorder,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deliveryOrderArrivedRequest: (data) => dispatch(DeliveryOrderActions.deliveryOrderArrivedRequest(data)),
    deliveryOrderArrivedBundleRequest: (data) => dispatch(DeliveryOrderActions.deliveryOrderArrivedBundleRequest(data)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraDoneScreen)

