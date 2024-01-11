import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeDashboardScreenStyle'
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



class HomeDashboardScreen extends Component {
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
            <Text style={styles.title}>268488</Text>
          </View>
          <View style={styles.rowInfo}>
            <View>
              <Text style={styles.info}>Penerima : MJP</Text>
              <Text style={styles.info}>Alamat Tujuan : Depok sawangan</Text>
            </View>
            <View>
              <Text style={styles.info2}>2020-05-01</Text>
              <Text style={styles.info2}>Belum berangkat</Text>
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
          <Button style={styles.button} primary rounded={true} onPress={() => this.props.navigation.navigate('DeliveryScreen')}>
            <Text style={styles.txtBtn}>Start Delivery</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeDashboardScreen)
