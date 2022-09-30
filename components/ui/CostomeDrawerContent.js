import {
  Alert,
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Icon } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { UpdateCollectorLocation } from "../../Services/appServices/Collector";
import { useNavigation } from "@react-navigation/native";
import {
  logout,
  storeUserData,
} from "../../Services/store/slices/profileSlice";
import { InsertUpdateToken } from "../../Services/appServices/loginService";
import * as TaskManager from "expo-task-manager";

const CostomeDrawerContent = (props) => {
  // console.log("props", props.data);
  const LOCATION_TASK_NAME = "background-location-task";

  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeUserData);
  // console.log(user);
  const [gLocationStatus, setgLocationStatus] = useState(false);

  // console.log('geolocation status', gLocationStatus);

  const toggleSwitch = () => {
    if (gLocationStatus === true) {
      setIsActive((previousState) => !previousState);
    } else {
      Alert.alert(
        "Enable Location !",
        "Please allow location enable gps tracking.",
        [
          { text: "Cancel" },
          // we can automatically open our app in their settings
          // so there's less friction in turning geolocation on
          {
            text: "Enable Geolocation",
            onPress: () =>
              Platform.OS === "ios"
                ? Linking.openURL("app-settings:")
                : Linking.openSettings(),
          },
        ]
      );
    }
  };
  const hasGeolocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      let finalStatus = status;
      if (finalStatus === "granted") {
        // console.log('permission grated')

        setgLocationStatus(true);
      } else {
        Alert.alert(
          "Enable Location !",
          "Please allow location enable gps tracking.",
          [
            { text: "Cancel" },
            // we can automatically open our app in their settings
            // so there's less friction in turning geolocation on
            {
              text: "Enable Geolocation",
              onPress: () =>
                Platform.OS === "ios"
                  ? Linking.openURL("app-settings:")
                  : Linking.openSettings(),
            },
          ]
        );
      }
    } catch (error) {}
  };
  // console.log('first is active', isActive);
  if (isActive) {
    // console.log("potato active");
    Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      // accuracy: Location.Accuracy.Balanced, maximumAge: 10000,
      accuracy: Location.Accuracy.Highest,
      distanceInterval: 1, // minimum change (in meters) betweens updates
      deferredUpdatesInterval: 7000,
      timeInterval: 7000,
      foregroundService: {
        notificationTitle: "Using your location",
        notificationBody:
          "To turn off, go back to the app and switch something off.",
      },
    });
  } else {
    // console.log("potato inactive");
    Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME).then(
      (value) => {
        if (value) {
          Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        }
      }
    );
  }

  useEffect(() => {
    hasGeolocationPermission();
  }, []);

  // "CId": 2,
  // "UserId": 1,
  // "UserName": "admin",
  // "UserRole": 2,
  // "UserToken": "ExponentPushToken[ET7-LfDUYXePmkyQy8VyIl]",

  const handleLogOut = async () => {
    let logOutData = {
      CId: user.userData.CId,
      UserId: user.userData.UserId,
      UserName: user.userData.UserName,
      UserRole: user.userData.UserRole,
      UserToken: "-",
    };
    dispatch(
      InsertUpdateToken(logOutData, (res) => {
        if (res?.SuccessMsg === true) {
          dispatch(logout(null));
        } else {
          // console.log(' logout error');
        }
      })
    );
  };
  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();
    if (error) {
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locations } = data;

      const lData = {
        LId: 0,
        UserId: props.data.UserId,
        Latitude: locations[0].coords.latitude,
        Longitude: locations[0].coords.longitude,
        EntryDate: newDate,
        ClientId: 0,
      };
      // return
      if (isActive === true) {
        // if (1 === 1) {
        dispatch(
          UpdateCollectorLocation(lData, (res) => {
            // console.log('res', res);
            // return
            if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
            } else {
              // console.log('some error occured while dispatch user location, api error map is still updated');
            }
          })
        );
      } else {
      }
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{backgroundColor: 'red'}}
      >
        <View style={styles.navHeaderContainer}>
          <Image
            style={styles.image}
            source={require("../../assets/images/user.png")}
          ></Image>
          <View style={styles.detail}>
            <Text style={styles.title}>{props.data.UserName}</Text>
            <Text style={styles.subTitle}>
              {props.data.UserRole === 2 ? "admin" : "collector"}
            </Text>
          </View>
        </View>
        <DrawerItemList {...props}></DrawerItemList>
        {/* {
          props.data.UserRole === 3 && */}
        <View style={styles.geoLocationContainer}>
          <Icon
            name="location-pin"
            color={primary}
            type="entropy"
            // style={styles.icon}
            style={{
              marginRight: 10,
            }}
          ></Icon>
          {isActive ? (
            <Text style={{ color: primary, fontSize: 14, letterSpacing: 1 }}>
              Location Enabled
            </Text>
          ) : (
            <Text style={{ color: primary, fontSize: 14, letterSpacing: 1 }}>
              Enable Location
            </Text>
          )}
          <Switch
            trackColor={{ false: "grey", true: "grey" }}
            thumbColor={isActive ? "green" : "#f4f3f4"}
            style={{
              transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
            }}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isActive}
          />
        </View>
        {/* // } */}

        <TouchableOpacity onPress={() => handleLogOut()} style={styles.logout}>
          <Icon
            name="logout"
            color={primary}
            type="entropy"
            style={{
              marginRight: 30,
            }}
          ></Icon>
          <Text
            style={{
              color: primary,
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

export default CostomeDrawerContent;

const styles = StyleSheet.create({
  navHeaderContainer: {
    paddingHorizontal: 10,
    // backgroundColor: '#6bbeee',
    paddingTop: 10,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 18,
    marginRight: 13,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#205072",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  subTitle: {
    fontSize: 14,
    letterSpacing: 1,
    color: secondary,
  },
  geoLocationContainer: {
    // backgroundColor: 'blue'
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logout: {
    marginTop: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
  },
});
