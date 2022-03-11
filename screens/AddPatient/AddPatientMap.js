import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BottomSheet, Button, ListItem } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

const AddPatientMap = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lat, setlat] = useState()
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
            >
              <Marker draggable
                coordinate={lat}
                onDragEnd={(e) => setlat({ x: e.nativeEvent.coordinate })}
              />
            </MapView>
            <View
              style={styles.bSheet}
            >
              <Button title='cancle' />
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
  }
})