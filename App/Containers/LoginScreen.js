import React, { Component } from 'react'
import { TouchableOpacity, Text, Image, View, ActivityIndicator } from 'react-native'
import { Icon, Container, Button, Header } from 'native-base';
import images from '../Themes/Images';
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { Colors, Metrics, Fonts } from '../Themes';
import TextInput from 'react-native-material-textinput';
import Entypo from 'react-native-vector-icons/Entypo';
import NumberOnly from '../Lib/NumberOnly';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AuthActions from '../Redux/AuthRedux';

// import { TextField } from 'react-native-material-textfield';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no_hp: '',
      password: '',
      show_password: false
    };
  }

  toggleShowPassword() {
    this.setState({
      show_password: !this.state.show_password
    })
  }

  login() {
    this.props.authRequest({ username: this.state.no_hp, password: this.state.password })
    // this.props.navigation.navigate('LoggedInStack')
    // this.props.navigation.navigate('ListCardViewScreen')
  }

  render() {
    let { no_hp, password } = this.state
    return (
      <Container style={styles.container}>
        {/* <KeyboardAvoidingView behavior='position'> */}
        <Header androidStatusBarColor={Colors.primaryColor} style={styles.header} />
        <View style={styles.rowLogo}>
          <TouchableWithoutFeedback onPress={() => {
            // if (__DEV__) {
            this.setState({ no_hp: '08888', password: 'enesisdist2019' })
            // }
          }}
          >
            <Image source={images.logoApp} style={styles.logo} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.containerContent}>
          <View style={styles.rowImage}>
            <Image source={images.login} style={styles.Image} />
          </View>
          <View style={styles.rowTitle}>
            {/* <TouchableWithoutFeedback onPress={() => (__DEV__) ? this.setState({ no_hp: '085678329883', password: 'drivermalam' }) : function(){}}> */}
            <Text style={styles.title}>Login</Text>
            {/* </TouchableWithoutFeedback> */}
          </View>
          <View style={styles.rowInput}>
            <TextInput
              label="No Hp"
              value={no_hp}
              onChangeText={no_hp => this.setState({ no_hp: NumberOnly(no_hp) })}
              activeColor={Colors.primaryColor}
              fontSize={Metrics.screenWidth / 27.5}
              labelActiveScale={.8}
              labelActiveTop={-22}
              fontFamily={Fonts.type.varela} 
            />
            <TextInput
              //ref={ x => this.passTextInput = x}
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
              activeColor={Colors.primaryColor}
              fontSize={Metrics.screenWidth / 27.5}
              labelActiveScale={.8}
              labelActiveTop={-22}
              secureTextEntry={!this.state.show_password}
              fontFamily={Fonts.type.varela}
            />
            <View style={styles.rowIconPassword}>
              <TouchableOpacity onPress={this.toggleShowPassword.bind(this)}>
                <Entypo name={this.state.show_password ? 'eye' : 'eye-with-line'} size={Metrics.screenHeight / 22.5} style={{ color: Colors.primaryColor }} />
              </TouchableOpacity>
            </View>
          </View>
             
          <View style={styles.rowButton}>
            <Button style={[styles.button, (!(this.state.no_hp && this.state.password && this.props.auth.fetching !== true )) ? { backgroundColor: 'gray'} : {}]} rounded={true} onPress={() => {
              if ((this.state.no_hp && this.state.password && this.props.auth.fetching !== true)) {
                this.login()
                // Sentry.captureException(this.state.password+' '+this.state.username);
              }
            }}>
              {
                (this.props.auth.fetching === true) ?
                  <ActivityIndicator style={styles.textButton} size="large" /> :      
                  <Text style={styles.textButton}>Lanjut</Text>
              }
            </Button>
          </View>
          
        </View>
        {/* </KeyboardAvoidingView> */}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authRequest: (data) => dispatch(AuthActions.authRequest(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
