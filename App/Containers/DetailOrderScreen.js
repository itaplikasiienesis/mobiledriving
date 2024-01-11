import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailOrderScreenStyle'
import { Colors, Metrics } from '../Themes';


const DATA = [
  {
    id: 1,
    nomor: 1,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
  {
    id: 2,
    nomor: 2,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
  {
    id: 3,
    nomor: 3,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
  {
    id: 4,
    nomor: 4,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
  {
    id: 5,
    nomor: 5,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
  {
    id: 6,
    nomor: 6,
    nama_barang: 'Nama Barang',
    quantity: 5,
    tonase: 5,
    kubikasi: 5
  },
];


class DetailOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  Item = ({ item }) => {
    return (
      <View style={styles.rowCard}>
        <Card>
          <CardItem>
            <View style={styles.containerDataCard}>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>No : </Text>
                <Text style={styles.dataItemCard}>{item.nomor}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Nama Barang : </Text>
                <Text style={styles.dataItemCard}>{item.nama_barang}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Quantity : </Text>
                <Text style={styles.dataItemCard}>{item.quantity}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Tonase : </Text>
                <Text style={styles.dataItemCard}>{item.tonase}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Kubikasi : </Text>
                <Text style={styles.dataItemCard}>{item.kubikasi}</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
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
            <Text style={styles.title}>Detail Order</Text>
          </View>
          <View style={styles.rowLogo}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('DeliveryScreen')}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rowInfo}>
          <View style={styles.containerDataInfo}>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>No Surat Jalan : </Text>
              <Text style={styles.dataInfo}>268488</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Tanggal : </Text>
              <Text style={styles.dataInfo}>2020-05-01</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Penerima : </Text>
              <Text style={styles.dataInfo}>MJP</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Alamat Tujuan : </Text>
              <Text style={styles.dataInfo}>Depok Sawangan</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Nama Driver : </Text>
              <Text style={styles.dataInfo}>Eko Sanjaya</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Nomor Polisi : </Text>
              <Text style={styles.dataInfo}>B 8566 DHA</Text>
            </View>
            <View style={styles.rowDataInfo}>
              <Text style={styles.titleInfo}>Status : </Text>
              <Text style={[styles.dataInfo, { color: Colors.primaryColor }]}>Belum Berangkat</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowSubtitle}>
          <Text style={styles.subTitle}>Pesanan</Text>
        </View>
        <ScrollView style={styles.containerItem}>
          <FlatList
            data={DATA}
            renderItem={this.Item}
            keyExtractor={item => item.id}
          />
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderScreen)
