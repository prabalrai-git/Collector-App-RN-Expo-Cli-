import { StyleSheet } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AddPatietNavigator,
  BookTestNavigator,
  CollectorLocation,
  MainStackNavigator,
  ReportVerification,
  SampleCollectionNavigator,
  TaskNavigator,
} from "./StackNavigator";
import { useSelector } from "react-redux";
import CostomeDrawerContent from "../components/ui/CostomeDrawerContent";
// import LocationTrackingHomeScreen from '../screens/LocationTracking/LocationTrackingHomeScreen'
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "react-native-elements";
import NotificationHomeScreen from "../screens/NotificationScreen/NotificationHomeScreen";

const DraweNavigator = () => {
  const Drawer = createDrawerNavigator();
  const user = useSelector((state) => state.storeUserData);
  // console.log("user role", user.userData.UserRole);
  // console.log('user', user.userData);
  let data = user.userData;
  const navigation = useNavigation();

  // user.userData === undefined ?
  //   navigation.navigate('LoginScreen')
  // : ''

  // useEffect(() => {
  //   getData()
  // }, [])

  // // console.log('asc storeage', UserStore);
  // // if (UserStore !== null) {
  // //   // dispatch(storeUserData(UserStore))
  // //   // setUserStore(UserStore)
  // // }

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem('@userData')
  //     if (jsonValue == null) {
  //       navigation.navigate('LoginScreen')
  //       // setIsSignedIn(true)
  //     }
  //     else {

  //     }
  //   } catch (e) {
  //   }

  // }

  return (
    <Drawer.Navigator
      drawerPosition="right"
      screenOptions={{
        drawerActiveTintColor: secondaryBkg,
        drawerInactiveTintColor: primary,
        drawerActiveBackgroundColor: primary,
        drawerInactiveBackgroundColor: secondaryBkg,
        drawerType: "front",

        // drawerContentStyle: {
        //   backgroundColor: 'red'
        // }
        drawerStyle: {
          backgroundColor: secondaryBkg,
          borderRadius: 18,
        },
      }}
      drawerContent={(props) => <CostomeDrawerContent {...props} data={data} />}
    >
      <Drawer.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          headerShown: false,
          // headerShadowVisible: false,
          // drawerActiveBackgroundColor: "#57b2e6be",
          // drawerActiveTintColor: '#fefefe',
          // drawerType: 'slide',

          title: "Home",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="home"
              color={color}
              type="antdesign"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />
      {/* <Drawer.Screen
        name='CollectSample'
        component={CollectSampleNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Collect Sample',
          tabBarIcon: ({ size, color }) => (
            <Icon
              name='lab-flask'
              color={'#FF7F00'}
              type='entypo'
              style={styles.icon}
            ></Icon>
          )
        }}
      /> */}
      <Drawer.Screen
        name="AddPatient"
        component={AddPatietNavigator}
        options={{
          headerShown: false,
          title: "Add Patient",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="addusergroup"
              color={color}
              type="antdesign"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="BookTest"
        component={BookTestNavigator}
        options={{
          // tabBarHideOnKeyboard: true,

          headerShown: false,
          title: "Patient",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="user"
              color={color}
              type="antdesign"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />

      <Drawer.Screen
        name="SampleHome"
        component={SampleCollectionNavigator}
        options={{
          // tabBarHideOnKeyboard: true,
          headerShown: false,
          title: "Total Sample",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="test-tube-alt"
              color={color}
              type="fontisto"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />
      <Drawer.Screen
        name="NotificationHome"
        component={NotificationHomeScreen}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
          drawerItemStyle: { display: "none" },
        }}
      />
      {/* {
        user.userData.UserRole === 3 && */}
      <Drawer.Screen
        name="task"
        component={TaskNavigator}
        options={{
          headerShown: false,
          title: "Task",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="notification"
              color={color}
              type="entypo"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />
      {/* } */}
      {/* {
        user.userData.UserRole === 2 && */}
      <Drawer.Screen
        name="CollectorLocation"
        component={CollectorLocation}
        options={{
          headerShown: false,
          title: "Location Tracking",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="find"
              color={color}
              type="antdesign"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />
      {/* } */}

      <Drawer.Screen
        name="ReportVerification"
        component={ReportVerification}
        options={{
          headerShown: false,
          title: "Report Verfication",
          drawerIcon: ({ size, color }) => (
            <Icon
              name="file1"
              color={color}
              type="antdesign"
              style={styles.icon}
            ></Icon>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DraweNavigator;

const styles = StyleSheet.create({});
