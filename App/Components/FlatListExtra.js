import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import styles from './Styles/FlatListExtraStyle'
import { Colors } from '../Themes'
import { size } from 'lodash'
import { Text, Button, Icon } from 'native-base'

export default class FlatListExtra extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        {
          (this.props.fetching === true) ? 
            <ActivityIndicator color={Colors.primaryColor} size="large" />
            :
            (this.props.error === true) ? 
              (this.props.errorComponent) ? this.props.errorComponent() :
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text note style={{ alignContent: 'center', textAlign: 'center' }}>
                    Gagal Mendapatkan Data...
                  </Text>
                  <Button large block transparent onPress={() => this.props.refreshControlFunction ? this.props.refreshControlFunction() : function(){}}>
                    <Icon name="md-refresh-circle" style={{ color: Colors.primaryColor }} />
                  </Button>
                </View>
              :
              <FlatList
                {...this.props}
                keyboardShouldPersistTaps="always"
                refreshControl={
                  <RefreshControl refreshing={false} onRefresh={() => this.props.refreshControlFunction ? this.props.refreshControlFunction() : function(){} } />
                }
                data={this.props.data ? this.props.data : []}
                contentContainerStyle={{ flexGrow: 1 }}
                renderItem={this.props.renderItem}
              // keyExtractor={item => item.idProduk + ''}
              // onEndReachedThreshold={0.1}
              // onEndReached={({ distanceFromEnd }) => {
              //   console.log('distanceFromEnd', distanceFromEnd)
              //   if (this.props.infoproduk.payload.length >= 10) {
              //     this.setState({
              //       pages: this.state.pages + 1
              //     }, () => {
              //       if (this.props.infoproduk.enddata !== true) {
              //         this.refreshProduk()
              //       }
              //     })
              //   }
              // }}
              />
        }
        
      </View>
    )
  }
}
