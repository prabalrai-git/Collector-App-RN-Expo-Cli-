import { Dimensions, Button, PermissionsAndroid, FlatList, StyleSheet, Text, View, ImageBackground, Switch, Linking } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import GreetingCard from '../components/ui/GreetingCard'
import CardButton from '../components/ui/CardButton'
import { useNavigation } from '@react-navigation/native';
import * as Location from "expo-location"

import { Alert, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateCollectorLocation } from '../Services/appServices/Collector';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


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
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const navigation = useNavigation()

  useEffect(() => {
    
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      navigation.navigate('BookTest')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };

    
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
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