import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Icon, Container, Button, Header } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/WelcomeScreenStyle'
import { Colors, Metrics } from '../Themes';

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.rowLogo}>
          <Image source={images.logoApp} style={styles.logo} />
        </View>
        <View style={styles.rowImage}>
          <Image source={images.welcome} style={styles.Image} />
        </View>
        <View style={styles.rowBottom}>
          <View style={styles.rowSubTitle}>
            <Text style={styles.subTitle}>Esales Mobile Driving</Text>
          </View>
          <View style={styles.rowTitle}>
            <Text style={styles.title}>Ready to</Text>
            <Text style={[styles.title, {marginTop: Metrics.screenWidth / -50}]}>move?</Text>
          </View>
          <View style={styles.rowButton}>
            <Button style={styles.button} rounded={true} onPress={() => this.props.navigation.navigate('LoginScreen')}>
              {/* <Text style={styles.textButton}>Next</Text> */}
              <Text style={styles.textButton}>Lanjut</Text>
            </Button>
            {/* <Text style={styles.textTerms}>Ketentuan layanan.</Text> */}
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
