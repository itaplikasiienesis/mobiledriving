import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
import DeliveryOrderActions from '../Redux/DeliveryOrderRedux'
import AuthActions from '../Redux/AuthRedux'

// Styles
import styles from './Styles/ListCardViewScreenStyle'
import { Colors, Metrics } from '../Themes';
import AsyncStorageHelper from '../Lib/AsyncStorageHelper';
import StaticVar from '../Config/StaticVar';
import FlatListExtra from '../Components/FlatListExtra';
import moment from 'moment'
import DateFormat from '../Lib/DateFormat';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


class ListCardViewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.reload()
  }

  reload() {
    AsyncStorageHelper(StaticVar.DB_KEY_SESSION).getDataObject().then(session => {
      console.log('session.profile.m_driver_id', session.profile.m_driver_id)
      this.props.deliveryOrderRequest({
        m_driver_id: session.profile.m_driver_id
      })
    })
  }

  generateStatus(doid, status) {
    return {
      m_user_id: this.props.auth.payload.m_user_id,
      delivery_order_id: doid,
      kode_status: status
    }
  }

  Item({ item }) {
    return (
      <View style={styles.rowCard}>
        <Card>
          <CardItem style={styles.containerCard}>
            <View style={styles.containerTitleCard}>
              <View>
                <Text style={styles.titleCard}>{item.nomor_do}</Text>
              </View>
              <View style={styles.colBtn}>
                <Button style={styles.button} primary onPress={() => this.props.navigation.navigate('DetailCardOrderScreen', { data: item })} small>
                  <Text style={styles.txtBtn}>Detail</Text>
                </Button>
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.containerCard}>
            <View style={styles.containerSecondCard}>
              <View style={{flexDirection: 'column', marginTop: Metrics.screenWidth / -20}}>
                <Text style={[styles.titleCard, { fontSize: Metrics.screenWidth / 35}]}>Bundle ID :</Text>
                <Text style={[styles.titleCard, { color: Colors.primaryColor }]}>{item.bundle_id}</Text>
              </View>
              <View style={styles.colBtn}>
                <Button
                  disabled={item.isgantidriverbymobile === 'N'}
                  style={[styles.button, item.isgantidriverbymobile === 'N' ? { backgroundColor: 'gray' } : undefined]}
                  primary
                  small
                  onPress={() => {
                    Alert.alert(
                      'Ganti Driver',
                      'Apakah Anda Yakin Untuk Ganti Driver?',
                      [
                        {
                          text: 'Batal',
                          onPress: () => { },
                          style: 'cancel',
                        },
                        {
                          text: 'OK',
                          onPress: () => {
                            this.props.deliveryOrderChangeStatusRequest(
                              this.generateStatus(item.delivery_order_id, 'CHG'),
                              {
                                status: 'Driver melakukan pergantian driver',
                                kode_status: 'CHG',
                                isgantidriverbymobile: 'N',
                                // issampailokasi: 'Y' ,

                                issge: 'N',
                                ispicking: 'N',
                                isstart: 'N',
                                issampailokasi: 'N',
                                isfinish: 'N'
                              }
                            )
                          },
                        }
                      ],
                      { cancelable: false },
                    )
                  }}
                >
                  <Text style={styles.txtBtn}>Ganti Driver</Text>
                </Button>
              </View>
            </View>
          </CardItem>
          <CardItem style={styles.containerCard}>
            <View style={styles.containerDataCard}>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Tujuan</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.tujuan}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Alamat</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.alamat}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Estimasi Sampai</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{DateFormat(item.schedule_delivery_date)}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Actual Sampai</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{DateFormat(item.actual_sampai_tujuan)}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Kubikasi</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.total_kubikasi}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Tonase</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.total_tonase}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Kendaraan</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.kendaraan}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Status</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.status}</Text>
              </View>
            </View>
          </CardItem>
          {/* <CardItem style={styles.containerCard}>
            <View style={styles.containerBtnCard}>
              <View style={styles.rowButton}>
                <View style={styles.colBtn}>
                  <Button
                    disabled={item.issge === 'N'}
                    style={[styles.button, item.issge === 'N' ? { backgroundColor: 'gray' } : undefined]}
                    primary
                    onPress={() => {
                      Alert.alert(
                        'Sampai Gudang',
                        'Apakah Barang Sudah Sampai Gudang?',
                        [
                          {
                            text: 'Batal',
                            onPress: () => { },
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              // console.log(this.generateStatus(item.delivery_order_id, 'SGE'))
                              this.props.deliveryOrderChangeStatusRequest(
                                this.generateStatus(item.delivery_order_id, 'SGE'),
                                { status: 'Sampai gudang Enesis', kode_status: 'SGE', issge: 'N', ispicking: 'Y' }
                              )
                            },
                          }
                        ],
                        { cancelable: false },
                      )
                    }}
                  >
                    <Text style={styles.txtBtn}>Sampai Gudang</Text>
                  </Button>
                </View>
                <View style={styles.colBtn}>
                  <Button
                    disabled={item.ispicking === 'N'}
                    style={[styles.button, item.ispicking === 'N' ? { backgroundColor: 'gray' } : undefined]}
                    primary
                    onPress={() => {
                      Alert.alert(
                        'Muat Barang',
                        'Apakah Barang Sudah di muat?',
                        [
                          {
                            text: 'Batal',
                            onPress: () => { },
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              this.props.deliveryOrderChangeStatusRequest(
                                this.generateStatus(item.delivery_order_id, 'PIC'),
                                { status: 'Picking barang', kode_status: 'PIC', ispicking: 'N', isstart: 'Y' }
                              )
                            },
                          }
                        ],
                        { cancelable: false },
                      )
                    }}
                  >
                    <Text style={styles.txtBtn}>Muat Barang</Text>
                  </Button>
                </View>
                <View style={styles.colBtn}>
                  <Button
                    disabled={item.isstart === 'N'}
                    style={[styles.button, item.isstart === 'N' ? { backgroundColor: 'gray' } : undefined]}
                    primary
                    onPress={() => {
                      Alert.alert(
                        'Berangkat',
                        'Apakah Anda Yakin Untuk Memulai?',
                        [
                          {
                            text: 'Batal',
                            onPress: () => { },
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              this.props.deliveryOrderChangeStatusRequest(
                                this.generateStatus(item.delivery_order_id, 'OTW'),
                                {
                                  status: 'Proses Pengantaran', kode_status: 'OTW',
                                  // isstart: 'N', 
                                  // isgantidriverbymobile: 'Y' ,

                                  isgantidriverbymobile: 'Y',
                                  issampailokasi: 'Y',
                                  issge: 'N',
                                  ispicking: 'N',
                                  isstart: 'N',
                                  isfinish: 'N'
                                }
                              )
                            },
                          }
                        ],
                        { cancelable: false },
                      )
                    }}
                  >
                    <Text style={styles.txtBtn}>Berangkat</Text>
                  </Button>
                </View>
              </View>
              <View style={[styles.rowButton, { marginTop: Metrics.screenHeight / 75 }]}>
                <View style={styles.colBtn2}>
                  <Button
                    disabled={item.issampailokasi === 'N'}
                    style={[styles.button, item.issampailokasi === 'N' ? { backgroundColor: 'gray' } : undefined]}
                    primary
                    onPress={() => this.props.navigation.navigate('CameraStackNavigator', { data: item })}
                  >
                    <Text style={styles.txtBtn}>Sampai Tujuan</Text>
                  </Button>
                </View>
                <View style={styles.colBtn2}>
                  <Button
                    disabled={item.isfinish === 'N'}
                    style={[styles.button, item.isfinish === 'N' ? { backgroundColor: 'gray' } : undefined]}
                    primary
                    onPress={() => {
                      Alert.alert(
                        'Selesai',
                        'Apakah Pesanan Sudah Diantarkan?',
                        [
                          {
                            text: 'Batal',
                            onPress: () => { },
                            style: 'cancel',
                          },
                          {
                            text: 'OK',
                            onPress: () => {
                              this.props.deliveryOrderChangeStatusRequest(
                                this.generateStatus(item.delivery_order_id, 'FNS'),
                                { status: 'Finish', kode_status: 'FNS', isfinish: 'N' }
                              )
                              // this.props.navigation.navigate('DeliveryConfirmationScreen') 
                            },
                          }
                        ],
                        { cancelable: false },
                      )
                    }}
                  >
                    <Text style={styles.txtBtn}>Selesai</Text>
                  </Button>
                </View>
              </View>
            </View>
          </CardItem> */}
        </Card>
      </View>
    );
  }


  render() {
    // console.log('this.props.deliveryorder.payload', this.props.deliveryorder.payload)
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.containerHeader}>
          <View style={styles.rowLogo}>
            {/* <TouchableWithoutFeedback onPress={() => this.props.authLogoutRequest()}> */}
            <Image source={images.logoApp} style={styles.logo} />
            {/* </TouchableWithoutFeedback> */}
          </View>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Daftar DO</Text>
          </View>
          <View style={styles.rowLogo}>
            <TouchableOpacity>
              <Text style={styles.back} onPress={() => {
                Alert.alert(
                  'Keluar (Logout)',
                  'Anda yakin akan mengakhiri sesi anda ?',
                  [
                    {
                      text: 'Batal',
                      onPress: () => { },
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => this.props.authLogoutRequest() },
                  ],
                  { cancelable: false },
                )
              }}>Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {
            (this.props.deliveryorder.payload.length > 0) ?
              <View style={styles.rowCard2}>
                <Card>
                  <CardItem style={styles.containerCard}>
                    <View style={styles.containerBtnCard2}>
                      <View style={styles.rowButton}>
                        <View style={styles.colBtn}>
                          <Button
                            style={styles.button}
                            primary
                            onPress={() => this.props.navigation.navigate('UpdateProcessScreen', { kode_status: 'SGE' })}
                          >
                            <Text style={styles.txtBtn}>Sampai Gudang</Text>
                          </Button>
                        </View>
                        <View style={styles.colBtn}>
                          <Button
                            style={styles.button}
                            primary
                            onPress={() => this.props.navigation.navigate('UpdateProcessScreen', { kode_status: 'PIC' })}
                          >
                            <Text style={styles.txtBtn}>Selesai Muat Barang</Text>
                          </Button>
                        </View>
                        <View style={styles.colBtn}>
                          <Button
                            style={styles.button}
                            primary
                            onPress={() => this.props.navigation.navigate('UpdateProcessScreen', { kode_status: 'OTW' })}
                          >
                            <Text style={styles.txtBtn}>Berangkat</Text>
                          </Button>
                        </View>
                      </View>
                      <View style={[styles.rowButton, { marginTop: Metrics.screenHeight / 75 }]}>
                        <View style={styles.colBtn2}>
                          <Button
                            style={styles.button}
                            primary
                            onPress={() => this.props.navigation.navigate('UpdateProcessScreen', { kode_status: 'SPL' })}
                          >
                            <Text style={styles.txtBtn}>Sampai Tujuan</Text>
                          </Button>
                        </View>
                        <View style={styles.colBtn2}>
                          <Button
                            style={styles.button}
                            primary
                            onPress={() => this.props.navigation.navigate('UpdateProcessScreen', { kode_status: 'FNS' })}
                          >
                            <Text style={styles.txtBtn}>Selesai</Text>
                          </Button>
                        </View>
                      </View>
                    </View>
                  </CardItem>
                </Card>
              </View>
              : null
          }
          <View style={styles.rowSubtitle}>
            <Text style={styles.subTitle}>Pesanan</Text>
          </View>
          <View style={styles.containerItem}>
            <FlatListExtra
              data={this.props.deliveryorder.payload}
              error={this.props.deliveryorder.error}
              fetching={this.props.deliveryorder.fetching}
              renderItem={this.Item.bind(this)}
              keyExtractor={(item, index) => index + ''}
              refreshControlFunction={() => {
                this.reload()
              }}
            />
            {/* <FlatList
            data={DATA}
            renderItem={this.Item}
            keyExtractor={(item, index) => index+''}
          /> */}

          </View>
        </View>
        {/* <View style={styles.rowButton}>
          <Button style={styles.button} primary rounded={true} onPress={() => this.props.navigation.navigate('DeliveryScreen')}>
            <Text style={styles.txtBtn}>Start Delivery</Text>
          </Button>
        </View> */}

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    deliveryorder: state.deliveryorder,
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deliveryOrderRequest: (data) => dispatch(DeliveryOrderActions.deliveryOrderRequest(data)),
    deliveryOrderChangeStatusRequest: (data, statustext) => dispatch(DeliveryOrderActions.deliveryOrderChangeStatusRequest(data, statustext)),
    authLogoutRequest: () => dispatch(AuthActions.authLogoutRequest()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListCardViewScreen)

