import React, { Component } from 'react'
import { ScrollView, Text, Image, View, FlatList, TouchableOpacity, Alert } from 'react-native'
import { Icon, Container, Button, Header, Card, CardItem } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DetailCardOrderScreenStyle'
import { Colors, Metrics } from '../Themes';



class DetailCardOrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    // console.log('data', data)
  }

  Item({ item }) {
    return (
      <View style={styles.rowCard}>
        <Card>
          <CardItem style={styles.containerCard}>
            <View style={styles.containerDataCard}>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Kode</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.kode_barang}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Desc</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.nama_barang}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Quantity</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.jumlah}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Tonase</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.tonase}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Kubikasi</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.kubikasi}</Text>
              </View>
              {/* <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Batch</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.batch}</Text>
              </View> */}
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Satuan</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.satuan}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Lokasi Storage</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.location_storage}</Text>
              </View>
              <View style={styles.rowDataCard}>
                <Text style={styles.titleItemCard}>Tanggal Expired</Text>
                <Text style={styles.titleItemCard2}>:</Text>
                <Text style={styles.dataItemCard}>{item.expired_date}</Text>
              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    );
  }


  render() {
    const param = this.props.navigation.getParam('data')
    const no_doc = param.nomor_do//this.props.navigation.getParam('no_doc')
    const data = param.details
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
          <View style={styles.rowLogo}></View>
        </View>
        <View style={styles.rowSubtitle}>
          <Text style={styles.subTitle}>{no_doc}</Text>
        </View>
        <View style={styles.containerItem}>
          <FlatList
            data={data}
            renderItem={this.Item.bind(this)}
            keyExtractor={(item, index) => index + ''}
          />
        </View>
        <View style={styles.rowButtonOk}>
          <Button style={styles.buttonOk} primary onPress={() => this.props.navigation.navigate('ListCardViewScreen')}>
            <Text style={styles.txtBtnOk}>Ok</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCardOrderScreen)


