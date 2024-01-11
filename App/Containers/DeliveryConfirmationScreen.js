import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Icon, Container, Button, Header } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/DeliveryConfirmationScreenStyle'
import { Colors, Metrics } from '../Themes';

class DeliveryConfirmationScreen extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.rowTitle}>
          <Text style={styles.title}>Delivery Done</Text>
        </View>
        <View style={styles.rowImage}>
          <Image source={images.confirmation} style={styles.Image} />
        </View>
        <View style={styles.rowSubTitle}>
          <Text style={styles.subTitle}>Dengan menekan tombol selesai,</Text>
          <Text style={styles.subTitle}>akan menghentikan session deliverymu.</Text>
        </View>
        <View style={styles.rowButton}>
          <Button style={styles.button} rounded={true} onPress={() => this.props.navigation.navigate('WelcomeScreen')}>
            <Text style={styles.textButton}>Finished</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryConfirmationScreen)
