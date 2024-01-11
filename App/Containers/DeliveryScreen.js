import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DeliveryScreenStyle'
import { Colors, Metrics } from '../Themes';

class DeliveryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
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
            <Text style={styles.title}>Delivery Order</Text>
          </View>
          <View style={styles.rowLogo}></View>
        </View>
        <View style={styles.rowCard}>
          <Card>
            <CardItem>
              <View style={styles.containerDataCard}>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>No Surat Jalan : </Text>
                  <Text style={styles.dataItemCard}>268488</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Tanggal : </Text>
                  <Text style={styles.dataItemCard}>2020-05-01</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Penerima : </Text>
                  <Text style={styles.dataItemCard}>MJP</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Alamat Tujuan : </Text>
                  <Text style={styles.dataItemCard}>Depok Sawangan</Text>
                </View>
                <View style={styles.rowDataCard}>
                  <Text style={styles.titleItemCard}>Status : </Text>
                  <Text style={styles.dataItemCard}>Belum Berangkat</Text>
                </View>
              </View>
            </CardItem>
            <CardItem>
              <View style={styles.rowButtonCard}>
                <Button style={styles.buttonCard} primary onPress={() => this.props.navigation.navigate('DetailOrderScreen')} small>
                  <Text style={[styles.txtBtnCard, { color: Colors.whiteColor }]}>Detail Order</Text>
                </Button>
              </View>
            </CardItem>
          </Card>
        </View>
        <View style={styles.rowButton}>
          <Button style={styles.buttonUpdate} primary rounded={true} onPress={() => this.props.navigation.navigate('UpdateProcessScreen')}>
            <Text style={[styles.txtBtn, { color: Colors.primaryColor }]}>Update Status</Text>
          </Button>
          <Button style={styles.button} primary rounded={true} onPress={() => this.props.navigation.navigate('DeliveryConfirmationScreen')}>
            <Text style={styles.txtBtn}>Finish</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen)
