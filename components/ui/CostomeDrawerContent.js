import { Alert, Image, ImageBackground, StyleSheet, Switch, Text, View, Linking, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Avatar } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import * as Location from "expo-location"
import { UpdateCollectorLocation } from '../../Services/appServices/Collector'
import { JumpingTransition } from 'react-native-reanimated'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'

const CostomeDrawerContent = (props) => {
  // console.log("props",props.data.usrUserId);
  const navigation = useNavigation()
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  const [geolocation, setGeolocation] = useState({
    'latitude': null,
    'longitude': null
  });
  const [gLocationStatus, setgLocationStatus] = useState(false);

  const toggleSwitch = () => {
    if (gLocationStatus !== false) {
      setIsActive(previousState => !previousState)

    } else {
      Alert.alert(
        'Location !',
        'Please allow location to, to find.',
        [
          { text: 'Cancel' },
          // we can automatically open our app in their settings
          // so there's less friction in turning geolocation on
          { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
        ]
      )
    }
  };
  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = status
      if (finalStatus === 'granted') {
        // console.log('permission grated')
        const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 })
        // console.log("location 1st", userLocation);
        temp(userLocation);
        setgLocationStatus(true);
      }
      // if (finalStatus !== 'granted') {
      //   Alert.alert(
      //     'Warning',
      //     'You will not search if you do not enable geolocation in this app. If you would like to search, please enable geolocation for Fin in your settings.',
      //     [
      //       { text: 'Cancel' },
      //       // we can automatically open our app in their settings
      //       // so there's less friction in turning geolocation on
      //       { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
      //     ]
      //   )
      //   return false;
      // }
    } catch (error) {
      // Alert.alert(
      //   'Error',
      //   'Something went wrong while check your geolocation permissions, please try again later.',
      //  [ { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }]
      // );
      // return false;
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
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.toLocaleTimeString();

    const data = {
      "LId": 0,
      "UserId": props.data.usrUserId,
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
          console.log('some error occured while dispatch user location');
        }
      }))
    } else {
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCollectorData()
    }, 20000);
    return () => clearInterval(interval)
  }, [geolocation])
  useEffect(() => {
    // if (gLocationStatus === false) {
    //   console.log('big potato');
    //   Alert.alert(
    //     'Location !',
    //     'Please allow location to, to find.',
    //     [
    //       { text: 'Cancel' },
    //       // we can automatically open our app in their settings
    //       // so there's less friction in turning geolocation on
    //       { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
    //     ]
    //   )
    // }
    hasGeolocationPermission()
  }, [])

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('@userData', null)
    navigation.navigate('LoginScreen')
  }

  
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
      // contentContainerStyle={{backgroundColor: 'red'}}
      >
        <View style={styles.navHeaderContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/user.png')}
          ></Image>
          <View style={styles.detail}>
            <Text style={styles.title}>User Name</Text>
            <Text style={styles.subTitle}>collector</Text>
          </View>
        </View>
        <DrawerItemList {...props}></DrawerItemList>

        <View style={styles.geoLocationContainer}>
          {
            isActive ?
              <Text style={{ color: '#767577', fontSize: 14, letterSpacing: 1 }}>
                Location activated
              </Text> :
              <Text style={{ color: '#767577', fontSize: 14, letterSpacing: 1 }}>
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
        <View style={styles.logout}>
          <TouchableOpacity onPress={() => handleLogOut()}>
            <Text style={{
              color: '#767577'
            }}>Log out</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  )
}

export default CostomeDrawerContent

const styles = StyleSheet.create({
  navHeaderContainer: {
    paddingHorizontal: 10,
    // backgroundColor: '#6bbeee',
    paddingTop: 10,
    paddingBottom: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 18,
    marginRight: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#205072',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    letterSpacing: 1,
  },
  geoLocationContainer: {
    // backgroundColor: 'blue'
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20
  },
  logout: {
    marginTop: 15,
    paddingHorizontal: 20,
  }
})