import { Dimensions, FlatList, ImageBackground, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Avatar, Icon } from 'react-native-elements';
import { GlobalStyles } from '../GlobalStyle';
import {HomeActionButton} from '../components/ui/HomeActionButton';
// import GreetingCard from '../components/ui/GreetingCard'
// import CardButton from '../components/ui/CardButton'
import * as Location from "expo-location"

import { Alert, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCollectorLocation } from '../Services/appServices/Collector';
import HamMenu from '../components/ui/HamMenu';
import Header from '../components/Header';

const navData = [
  {
    id: 1,
    name: 'Add Patient',
    pathName: 'AddPatient',
    color: '#9985FF',
    icon: 'addfile'
  },
  {
    id: 2,
    name: 'Patient',
    pathName: 'BookTest',
    color: '#FF8585',
    icon: 'book'
  },
  {
    id: 3,
    name: 'Sample',
    pathName: 'SampleHome',
    color: '#FFC285',
    icon: 'switcher'
  },
  {
    id: 4,
    name: 'Asigned Task',
    pathName: 'task',
    color: '#4688B3',
    icon: 'select1'
  },
]


const windowWidth = Dimensions.get('window').width;
const HomeScreen = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.storeUserData);
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



  const renderItem = ({ item }) => (
    <HomeActionButton data={item} />
  )

  return (
    <View style={styles.maincontainer}>
      <ImageBackground
        source={require('../assets/images/bkg2.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      >
        <View style={styles.hamMenu}>
          <HamMenu></HamMenu>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.dis}>
            <Text style={[GlobalStyles.header, { color: '#205072' }]}>Good Moring</Text>
            <Text style={[GlobalStyles.body, { color: '#3d4e58' }]}>Your target for today is to keep positive mindset and smile to everyone you meet.</Text>
          </View>
          <Avatar
            size={64}
            rounded
            source={require('../assets/images/user.png')}
          />
        </View>
        <FlatList
          data={navData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          style={styles.flatContainer}
        />
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
      </ImageBackground>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  bkgImg: {
    flex: 1,
    paddingTop: 40,
  },
  cardContainer: {
    flexDirection: 'row',
    width: windowWidth - 40,
    justifyContent: 'space-between',
    backgroundColor: global.primaryBkg,
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginHorizontal: 20,
    marginTop: 60,
    shadowColor: "#86a3a3",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  dis: {
    width: windowWidth * 0.65,
  },
  flatContainer: {
    width: windowWidth - 20,
    marginHorizontal: 10,
    paddingVertical: 15,
  },
  geoLocationContainer: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 13,
    paddingVertical: 10,
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#F57F20',
    backgroundColor: '#8ED1FC',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  hamMenu:{
    width: windowWidth,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
  }
})