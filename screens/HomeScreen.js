import { Dimensions, PermissionsAndroid, FlatList, StyleSheet, Text, View, ImageBackground, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import GreetingCard from '../components/ui/GreetingCard'
import CardButton from '../components/ui/CardButton'
import { useNavigation } from '@react-navigation/native';
import * as Location from "expo-location"

import { Alert, Platform } from 'react-native'
import { useSelector } from 'react-redux';


const windowWidth = Dimensions.get('window').width;

const navData = [
  {
    id: 1,
    name: 'Add Patient',
    pathName: 'AddPatient',
    color: '#9985FF'
  },
  {
    id: 2,
    name: 'Book Test',
    pathName: 'BookTest',
    color: '#FF8585'
  },
  {
    id: 3,
    name: 'Sample',
    pathName: 'SampleHome',
    color: '#FFC285'
  },
  {
    id: 4,
    name: 'Asigned Task',
    pathName: 'task',
    color: '#4688B3'
  },
]


const HomeScreen = () => {
  const user = useSelector(state => state.storeUserData);
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const toggleSwitch = () => setIsActive(previousState => !previousState);
  const [geolocation, setGeolocation] = useState({
    'latitude': null,
    'longitude': null
  });


  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = status
      if (finalStatus === 'granted') {
        // console.log('permission grated')
        const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 })
        // console.log("location 1st", userLocation);
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
  }

  const setCollectorData = () => {
    hasGeolocationPermission()
    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const data = {
      "LId": 0,
      "UserId": user.userData.usrUserId,
      "Latitude": geolocation.latitude,
      "Longitude": geolocation.longitude,
      "EntryDate": newDate,
      "ClientId": 0
    }
    if (isActive === true) {
      dispatch(UpdateCollectorLocation(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          console.log(res)
        } else {
          console.log('some error occured while dispatch');
        }
      }))
    } else {
      // console.log('no data');
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCollectorData()
    }, 5000);
    return () => clearInterval(interval)
  }, [geolocation])
  useEffect(() => {
    hasGeolocationPermission()
  }, [])


  const renderItem = ({ item }) => (
    <CardButton data={item} />
  )
  return (
    <View
      style={styles.mainContainer}
    >
      <GreetingCard />
      <View style={styles.cardContainer} >
        <FlatList
          data={navData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>

      <View style={styles.geoLocationContainer}>
        {
          isActive ?
            <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: 'bold', letterSpacing: 1.2 }}>
              Location activated
            </Text> :
            <Text style={{ color: '#fefefe', fontSize: 18, fontWeight: 'bold', letterSpacing: 1.2 }}>
              Activate location
            </Text>
        }

        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isActive ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isActive}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#ffffff',

  },
  cardContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth - 13,

  },
  geoLocationContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 13,
    paddingVertical: 15,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: global.secodaryCardColor,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  }
})