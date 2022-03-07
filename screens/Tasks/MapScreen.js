import { Dimensions, PermissionsAndroid, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import * as Location from "expo-location"
import MarkerCostome from '../../components/ui/MarkerCostome'
import { Avatar, Button, Text } from 'react-native-elements'
// import MapboxGL from '@react-native-mapbox-gl/maps'

// MapboxGL.setAccessToken('pk.eyJ1IjoiOThtYXJlIiwiYSI6ImNsMDBrcnNwbTBhNHUzY3J5eGN6MGgwZm8ifQ.IQosi4_gB8CXD9q31fl7RQ');


// latitude: geolocation.latitude,
// longitude: geolocation.longitude,



const MapScreen = ({ route }) => {
  console.log(route.params.data.location)
  const [location, setLocation] = useState(null);
  const [errorMsg, seterrorMsg] = useState(null);
  const navigation = useNavigation();
  const [geolocation, setGeolocation] = useState({
    'latitude': null,
    'longitude': null
  });

  // for collector 
  const marker = {
    latlng: {
      latitude: geolocation.latitude === null ? 27.7172 : geolocation.latitude,
      longitude: geolocation.longitude === null ? 85.3240 : geolocation.longitude,
    },
    title: 'title',
    description: 'somethindg'
  }
  // for cliet
  const cMarker = {
    latlng: {
      // latitude: geolocation.latitude === null ?27.7172 :geolocation.latitude,
      // longitude: geolocation.longitude === null ?85.3240 :geolocation.longitude,
      latitude: 27.7172,
      longitude: 85.3240
    },
    title: 'title',
    description: 'somethindg'
  }


  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestBackgroundPermissionsAsync();
      let finalStatus = status
      if (finalStatus === 'granted') {
        // console.log('permission grated')
        const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 })
        // console.log(JSON.stringify(userLocation));
        temp(userLocation);
      }
      if (finalStatus !== 'granted') {
        Alert.alert(
          'Warning',
          'You will not search if you do not enable geolocation in this app. If you would like to search, please enable geolocation for Fin in your settings.',
          [
            { text: 'Cancel' },
            // we can automatically open our app in their settings
            // so there's less friction in turning geolocation on
            { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
          ]
        )
        return false;

      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Something went wrong while check your geolocation permissions, please try again later.'
      );
      return false;
    }
  }

  function temp(e) {
    setGeolocation({
      'latitude': e.coords.latitude,
      'longitude': e.coords.longitude,
    })
    console.log(geolocation)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      hasGeolocationPermission()
    }, 20000);
    return () => clearInterval(interval)
  }, [geolocation])
  useEffect(() => {
    hasGeolocationPermission()
  }, [])



  return (
    <View style={styles.container}>
      {/* <MapboxGL.MapView style={styles.map} /> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: geolocation.latitude === null ? 27.7172 : geolocation.latitude,
          longitude: geolocation.longitude === null ? 85.3240 : geolocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* for colector */}
        <MarkerCostome
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          forCollector
        />
        {/* for client */}
        <MarkerCostome
          coordinate={cMarker.latlng}
          title={cMarker.title}
          description={cMarker.description}
          forClient
        />
      </MapView>
      <View style={styles.bSheet}>
        <View style={styles.avatar}>
          <Avatar
            size={64}
            rounded
            source={require('../../assets/images/user.png')}
          />
        </View>

        <View style={styles.details}>
          <Text h4>Suman Sunuwar</Text>
          <Text>sample collction for covid</Text>
          <Button title='start'></Button>
        </View>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bSheet: {
    position: 'absolute',
    // height: 120,
    zIndex: 100,
    bottom: 0,
    left: 10,
    right: 10,
    // height: 100,
    backgroundColor: '#fefefe',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  details: {
    width: Dimensions.get('window').width * 0.65,
  },
  avatar: {
    width: Dimensions.get('window').width * 0.25,
    textAlign: 'center',
    alignItems: 'center'
  }
})