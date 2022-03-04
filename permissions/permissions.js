// export const hasGeolocationPermission = async () => {
//   try {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     let finalStatus = status
//     if (finalStatus === 'granted') {
//       // console.log('permission grated')
//       const userLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 })
//       // console.log(JSON.stringify(userLocation));
//       temp(userLocation);
//     }


//     if (finalStatus !== 'granted') {
//       Alert.alert(
//         'Warning',
//         'You will not search if you do not enable geolocation in this app. If you would like to search, please enable geolocation for Fin in your settings.',
//         [
//           { text: 'Cancel' },
//           // we can automatically open our app in their settings
//           // so there's less friction in turning geolocation on
//           { text: 'Enable Geolocation', onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() }
//         ]
//       )
//       return false;

//     }
//   } catch (error) {
//     Alert.alert(
//       'Error',
//       'Something went wrong while check your geolocation permissions, please try again later.'
//     );
//     return false;
//   }
// }

// function temp(e) {
//   setGeolocation({
//     'latitude': e.coords.latitude,
//     'longitude': e.coords.longitude,
//   })
//   console.log(geolocation)
// }