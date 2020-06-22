import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Text} from 'react-native-elements';
import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class GeolocationExample extends Component {
  state = {
    latitude: -6.2,
    longitude: 106.816666,
  };

  watchID = null;

  componentDidMount() {
    this.watchID = Geolocation.watchPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          placement="left"
          leftComponent={
            <MaterialIcons
              name="menu"
              size={30}
              style={styles.icon}
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          }
          centerComponent={<Text style={styles.textHeader}>My Location</Text>}
          containerStyle={styles.header}
        />
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          followsUserLocation={true}
          showsUserLocation={true}
          showsCompass={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    height: 60,
  },
  map: {
    flex: 1,
  },
  icon: {marginBottom: 30},
  textHeader: {
    fontSize: 22,
    marginBottom: 30,
  },
});
