import { Dimensions, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { useNavigation } from '@react-navigation/native'
import * as Location from "expo-location"
// import MapboxGL from '@react-native-mapbox-gl/maps'

// MapboxGL.setAccessToken('pk.eyJ1IjoiOThtYXJlIiwiYSI6ImNsMDBrcnNwbTBhNHUzY3J5eGN6MGgwZm8ifQ.IQosi4_gB8CXD9q31fl7RQ');



const marker = {
  latlng: {
    latitude: 27.7172,
    longitude: 85.3240,
  },
  title: 'title',
  description: 'somethindg'
}


const MapScreenn = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, seterrorMsg] = useState(null);
  const navigation = useNavigation();
  const [geolocation, setGeolocation] = useState({
    'latitude': null,
    'longitude': null
  });
  // let data = {
  //   "LId": 1,
  //   "UserId": 200,
  //   "Latitude": JSON.stringify(coordinate.latitude),
  //   "Longitude": JSON.stringify(coordinate.longitude),
  //   "EntryDate": "2022-02-22T13:00:10.977",
  //   "ClientId": 6
  // }

  // const getLocation = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the Location");
  //       const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
  //       // console.log(userLocation)
  //       setCoordinate({
  //         'latitude': userLocation.coords.latitude,
  //         'longitude': userLocation.coords.longitude,
  //       })
  //       setLocation(JSON.stringify(userLocation));
  //       console.log(coordinate);

  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }

  // }
  // // console.log(coordinate)
  // // console.log(data)
  // useEffect(() => {
  //   setInterval(() => {
  //     getLocation()
  //   }, 10000);
  // }, [])

  // function loadData() {
  //   const configuration = {
  //     url: 'http://lunivacare.ddns.net/CarelabDataMetricService_qc/Api/InsertupdateCollectorLocationDetails',
  //     method: 'POST',
  //     data: data,
  //   }
  //   axios(configuration)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("SucessFull")
  //       } else {
  //         console.log("error")
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('error')
  //     })
  // }

  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
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



  return (
    <View style={styles.container}>
      {/* <MapboxGL.MapView style={styles.map} /> */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.7172,
          longitude: 85.3240,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />
      </MapView>
    </View>
  )
}

export default MapScreenn

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})