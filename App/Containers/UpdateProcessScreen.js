import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DeliveryOrderActions from '../Redux/DeliveryOrderRedux'
import AwesomeAlert from 'react-native-awesome-alerts';

// Styles
import styles from './Styles/UpdateProcessScreenStyle'
import CheckBox from 'react-native-check-box'
import TextInput from 'react-native-material-textinput';
import { Colors, Metrics, Fonts } from '../Themes';
import FlatListExtra from '../Components/FlatListExtra'; 

class UpdateProcessScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedData: [],
      showAlert: false
    };
  }
  
  componentDidMount() {
    this.props.deliveryOrderBundleRequest({
      m_driver_id: this.props.auth.payload.profile.m_driver_id,
      kode_status: this.props.navigation.getParam('kode_status')
    })
  }

  Item({ item }) {
    return (
      <View style={styles.rowCard}>
        <Card>
          <CardItem style={styles.containerCard}>
            <View style={styles.containerDataCard}>
              <View style={styles.rowDataCard}>
                <CheckBox
                  style={styles.checkbox}
                  isChecked={this.state.selectedData.some(x => x.bundle_id === item.bundle_id)}
                  onClick={() => {
                    console.log('onclick', item.bundle_id, this.state.selectedData.some(x => x.bundle_id === item.bundle_id) && this.state.selectedData.length > 0)
                    if (this.state.selectedData.some(x => x.bundle_id === item.bundle_id) && this.state.selectedData.length > 0) {
                      this.setState({
                        selectedData: this.state.selectedData.filter(x => x.bundle_id !== item.bundle_id)
                      })
                    } else {
                      this.setState({
                        selectedData: [...this.state.selectedData, {bundle_id: item.bundle_id}]
                      })
                    }
                  }}
                />
              </View>
              <View style={styles.columnDataCard}>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Nomor</Text>
                  <Text style={styles.titleItemCard2}>:</Text>
                  <Text style={styles.dataItemCard}>{item.nomor}</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Bundle ID</Text>
                  <Text style={styles.titleItemCard2}>:</Text>
                  <Text style={styles.dataItemCard}>{item.bundle_id}</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Distributor</Text>
                  <Text style={styles.titleItemCard2}>:</Text>
                  <Text style={styles.dataItemCard}>{item.penerima}</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Status</Text>
                  <Text style={styles.titleItemCard2}>:</Text>
                  <Text style={[styles.dataItemCard, { color: Colors.primaryColor }]}>{item.status}</Text>
                </View>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    )
  }

  render() { 
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.containerHeader}>
          <View style={styles.rowLogo}>
            <Image source={images.logoApp} style={styles.logo} />
          </View>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Proses</Text>
          </View>
          <View style={styles.rowLogo}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ListCardViewScreen')}>
              <Text style={styles.back}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </View> 
        <View style={styles.containerItem}>
          {/* <FlatList
            data={DATA}
            renderItem={this.Item}
            keyExtractor={item => item.id}
          /> */}
          <FlatListExtra 
            data={this.props.deliveryorder.payloadbundle}
            error={this.props.deliveryorder.errorbundle}
            fetching={this.props.deliveryorder.fetchingbundle}
            renderItem={this.Item.bind(this)} 
            keyExtractor={(item, index) => index + ''}
            refreshControlFunction={() => {
              this.props.deliveryOrderBundleRequest({
                m_driver_id: this.props.auth.payload.profile.m_driver_id,
                kode_status: this.props.navigation.getParam('kode_status')
              })
            }}
          />
        </View>
        <View style={styles.rowButton}>
          <Button style={styles.buttonBatal} primary rounded={true} onPress={() => this.props.navigation.navigate('ListCardViewScreen')}>
            <Text style={[styles.txtBtn, { color: Colors.whiteColor }]}>Batal</Text>
          </Button>
          <Button
            disabled={this.state.selectedData.length === 0}
            style={styles.button(this.state.selectedData.length === 0)}
            primary
            rounded={true}
            // onPress={() => this.props.navigation.navigate('ListCardViewScreen')}
            onPress={() => {
              if (this.props.navigation.getParam('kode_status') === 'SPL') {
                this.props.navigation.navigate('CameraStackNavigator', { data: this.state.selectedData, isBundle: true })
              } else {
                Alert.alert(
                  'Proses',
                  'Anda yakin akan melakukan proses ini ?',
                  [
                    {
                      text: 'Batal',
                      onPress: () => { },
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => {
                      this.setState({showAlert: true})
                      // this.props.navigation.navigate('ListCardViewScreen') 

                      // const dataToSend = {
                      //   m_user_id: this.props.auth.payload.m_user_id,
                      //   kode_status: this.props.navigation.getParam('kode_status'), 
                      //   data  : this.state.selectedData
                      // }
                      // this.props.deliveryOrderPushMultipleRequest(dataToSend)
                    }},
                  ],
                  { cancelable: false },
                )
              }
              
            }}>
            <Text style={styles.txtBtn}>Proses</Text>
          </Button>
        </View>

        {
          (this.state.showAlert) ?
          <View> 
            <AwesomeAlert
              show={this.state.showAlert}
              showProgress={false}
              title="Izin Lokasi"
              message="Aplikasi ini membutuhkan lokasi anda untuk dikirim ke Server sebagai bukti. Klik OK Untuk Setuju"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true} 
              confirmText="OK"
              cancelText="Batal"
              customView={<Image source={images.locationreq} style={{width: 50, height: 50}} />}
              confirmButtonColor="#DD6B55"
              onCancelPressed={() => { 
                this.setState({showAlert: false})
              }}
              onConfirmPressed={() => {
                this.setState({
                  showAlert: false
                },() => {
                  const dataToSend = {
                    m_user_id: this.props.auth.payload.m_user_id,
                    kode_status: this.props.navigation.getParam('kode_status'), 
                    data  : this.state.selectedData
                  }
                  console.log('cek dataToSend', dataToSend)
                  this.props.deliveryOrderPushMultipleRequest(dataToSend)
                })
              }}
            />
          </View> : null
        }
        
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deliveryorder: state.deliveryorder,
    auth:state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deliveryOrderBundleRequest: (data) => dispatch(DeliveryOrderActions.deliveryOrderBundleRequest(data)),
    deliveryOrderPushMultipleRequest: (data) => dispatch(DeliveryOrderActions.deliveryOrderPushMultipleRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProcessScreen)
