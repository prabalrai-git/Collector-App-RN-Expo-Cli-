import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const AddPatientMap = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const navigation = useNavigation();
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Button
          title="Open Bottom Sheet"
          onPress={() => setIsVisible(true)}
          buttonStyle={styles.button}
          style={styles.btn}
        />
        <BottomSheet modalProps={{}} isVisible={isVisible}>
          <View style={{ flex: 1 }}>
            <MapView
              style={styles.map}
              initialRegion={{
                // latitude: geolocation.latitude === null ? 27.7172 : geolocation.latitude,
                // longitude: geolocation.longitude === null ? 85.3240 : geolocation.longitude,
                latitude: 27.7172,
                longitude: 85.3240,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onRegionChangeComplete={(region) => setRegion(region)}
            >
              {console.log(region)}
            </MapView>
            <View style={styles.cMarker}>
              <Image
                source={require('../../assets/images/collector.png')}
                style={styles.cMarkerImg}
              ></Image>
            </View>
            <View
              style={styles.bSheet}
            >
              <Button title='cancle' onPress={() => navigation.navigate('AddPatietHomeScreen')}/>
              <Text>{JSON.stringify(region)}</Text>
              <Button title='save' />
            </View>

          </View>

        </BottomSheet>
      </View>
    </SafeAreaProvider>
  )
}

export default AddPatientMap

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    marginTop: 10,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bSheet: {
    position: 'absolute',
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
  },
  cMarker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  cMarkerImg: {
    width: 20,
    resizeMode: 'contain',
  }
})