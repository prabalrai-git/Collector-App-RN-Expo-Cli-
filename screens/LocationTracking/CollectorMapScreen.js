import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Icon } from 'react-native-elements'
import MapView from 'react-native-maps'
import { GetlocationofCollectorByDateAndUserId } from '../../Services/appServices/Collector'
import { useDispatch } from 'react-redux'
import MarkerCostome from '../../components/ui/MarkerCostome'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'

const windowWidth = Dimensions.width;

const CollectorMapScreen = ({ route }) => {

  // console.log('route', route.params.data);
  const navigation = useNavigation()
  const [Coordinate, setCoordinate] = useState({
    'latitude': null,
    'longitude': null
  });
  const [Newdate, setNewdate] = useState('');
  const dispatch = useDispatch()

  let today = new Date();
  const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  let cData = {
    "entrydate": newDate,
    "userId": route.params.data.UserId
  }

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(GetlocationofCollectorByDateAndUserId(cData, (res) => {
        // console.log(res?.collectorLocation);
        if (res?.collectorLocation.length > 0) {
          // console.log(res?.collectorLocation[res?.collectorLocation.length - 1]);
          setCoordinate({
            'latitude': res?.collectorLocation[res?.collectorLocation.length - 1].Latitude,
            'longitude': res?.collectorLocation[res?.collectorLocation.length - 1].Longitude
          })
        }
      }))
    }, 10000);
    return () => clearInterval(interval)

  }, [Coordinate])

  console.log(Coordinate);
  
  let cMarker = {
    latlng: {
      latitude: Coordinate.latitude === null ? 27.7172 : Number(Coordinate.latitude),
      longitude: Coordinate.longitude === null ? 85.3240 : Number(Coordinate.longitude)
      // latitude: 27.7172,
      // longitude: 85.3240,
    },
    title: route.params.data.UserName,
    description: `user Id:${route.params.data.UserId}`
  }
  // console.log(cMarker);
  return (
    <View style={styles.mainContainer}>
      <Header title={`${route.params.data.UserName} Location`}></Header>
      <View style={styles.mapViewContainer}>
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: Coordinate.latitude === null || Coordinate.latitude === undefined ? 27.7172 : Number(Coordinate.latitude),
            longitude: Coordinate.longitude === null || Coordinate.longitude === undefined ? 85.3240 : Number(Coordinate.longitude),
            latitudeDelta: 0.0111922,
            longitudeDelta: 0.0111421,
          }}
        >
          <MarkerCostome
            coordinate={cMarker.latlng}
            title={cMarker.title}
            description={cMarker.description}
            forCollector
          />
        </MapView>
        <View style={styles.bSheet}>
          <Avatar
            size={64}
            rounded
            source={require('../../assets/images/user.png')}
          />
          <View style={styles.details}>
            <Text style={styles.title}>{route.params.data.UserName}</Text>
            <Text style={styles.dis}>user id: {route.params.data.UserId}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CollectorMapScreen

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flex: 0.9,
    // backgroundColor: 'red'
  },
  mapViewContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    flex: 1,
  },
  bSheet: {
    position: 'absolute',
    zIndex: 100,
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: '#fefefe',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    flexDirection: 'row',
    // justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  details: {
    width: 250,
    marginLeft: 20,
  },
  title: {
    color: '#205072',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'capitalize'
  },
  dis: {
    color: '#FF7F00',
    letterSpacing: 1,
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'justify'
  }
})