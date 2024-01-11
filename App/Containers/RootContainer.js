import React, { Component } from 'react'
import { View, StatusBar, Image, YellowBox } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import images from '../Themes/Images';
import FlashMessage from 'react-native-flash-message'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import { Root, StyleProvider } from 'native-base'
import getTheme from '../../native-base-theme/components'
import material from '../../native-base-theme/variables/material'
import SpinnerOverlay from 'react-native-loading-spinner-overlay' 
import AwesomeAlert from 'react-native-awesome-alerts';
import OverlayAlertActions from '../Redux/OverlayAlertRedux';

// Styles
import styles from './Styles/RootContainerStyles'


YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
])

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    // if (!ReduxPersist.active) {
    // }
    this.props.startup()
  }

  render () {
    console.log('overlayalert', this.props.overlayalert.show)
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <Root>
          <StyleProvider style={getTheme(material)}>
            <ReduxNavigation />
          </StyleProvider>
          <SpinnerOverlay
            visible={this.props.overlayspinner.fetching === true}
            textContent={this.props.overlayspinner.text}
            textStyle={{
              color: 'white'
            }}
            overlayColor={'rgba(0,80,40,0.4)'}
          />
          <FlashMessage position="top" />
          {
            (this.props.overlayalert.show === true) ? 
                <View> 
                <AwesomeAlert
                  show={this.props.overlayalert.show === true}
                  showProgress={false}
                  title="Izin Lokasi"
                  message={this.props.overlayalert.text} //Aplikasi ini Membutuhkan Izin untuk menggunakan Lokasi Anda. Klik OK Untuk Setuju
                  closeOnTouchOutside={false}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  showConfirmButton={true} 
                  confirmText="OK"
                  cancelText="Batal"
                  customView={(this.props.overlayalert.image ? <Image source={this.props.overlayalert.image} style={{width: 50, height: 50}} /> : undefined)} //images.locationreq
                  confirmButtonColor="#DD6B55"
                  onCancelPressed={() => { 
                    this.props.overlayAlertSelected(false)
                  }}
                  onConfirmPressed={() => {
                    this.props.overlayAlertSelected(true)
                  }}
                />
              </View>
            : null
          }          
        </Root>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    overlayspinner: state.overlayspinner,
    overlayalert: state.overlayalert,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()), 
  overlayAlertSelected: (ispositive) => dispatch(OverlayAlertActions.overlayAlertSelected(ispositive))

})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
