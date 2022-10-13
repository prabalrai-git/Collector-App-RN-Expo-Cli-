import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  getLoginApi,
  GetTokenByUserId,
  InsertUpdateToken,
} from "../../Services/appServices/loginService";
import { Icon, Text } from "react-native-elements";
// import AppButton from "../../components/ui/AppButton";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeUserData } from "../../Services/store/slices/profileSlice";

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import LoginBtn from "../../components/ui/LoginBtn";
// import NotificationBtn from '../components/ui/NotificationBtn';

const windowWidth = Dimensions.get("window").width * 0.9;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [btnDis, setBtDis] = useState(true);
  const dispatch = useDispatch();
  const [Token, setToken] = useState("");
  const [isInitalLoading, setisInitalLoading] = useState(true);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    if (Token !== "") {
      setBtDis(false);
      setisInitalLoading(false);
    } else {
      setBtDis(true);
      setisInitalLoading(true);
    }
  }, [Token]);

  const handleLogin = () => {
    setBtDis(true);
    setIsLoading(true);

    let data = {
      user: username,
      pass: password,
    };

    dispatch(
      getLoginApi(data, (val) => {
        if (val.length !== 0) {
          let andd = val?.validuserDetails;
          if (andd[0]?.usrUserId > 0) {
            // console.log('add 0', andd[0].usrUserId);
            // return

            dispatch(
              GetTokenByUserId(andd[0].usrUserId, (res) => {
                // console.log('toet token', res.userToken);
                // return

                if (res?.userToken === undefined) {
                  let insertTokenData = {
                    CId: 0,
                    UserId: andd[0].usrUserId,
                    UserName: andd[0].usrusername,
                    UserRole: andd[0].usrrole,
                    UserToken: Token,
                  };
                  dispatch(
                    InsertUpdateToken(insertTokenData, (res) => {
                      if (res?.SuccessMsg === true) {
                        // cid add  from response
                        let temp = {
                          CId: res?.CreatedId,
                          UserId: andd[0].usrUserId,
                          UserName: andd[0].usrusername,
                          UserRole: andd[0].usrrole,
                          UserToken: Token,
                        };
                        dispatch(storeUserData(temp));
                      } else {
                      }
                    })
                  );
                } else {
                  let updateTokenData = {
                    CId: res.userToken[0].CId,
                    UserId: andd[0].usrUserId,
                    UserName: andd[0].usrusername,
                    UserRole: andd[0].usrrole,
                    UserToken: Token,
                    // "UserToken": 'dummy'
                  };
                  // console.log('log 1 data', updateTokenData);
                  // if (res.userToken[0].UserToken === '') {
                  // inset if user token is empty
                  dispatch(
                    InsertUpdateToken(updateTokenData, (res) => {
                      if (res?.SuccessMsg === true) {
                        dispatch(storeUserData(updateTokenData));
                      } else {
                        // console.log('log 1 error');
                        Alert.alert("Server error !", "Please try again later");
                      }
                    })
                  );
                  // }
                }
                // console.log("res" , res.userToken[0].UserToken);
                setIsLoading(false);
              })
            );
          } else {
            setIsLoading(false);
            Alert.alert("Log in failed", "User and Password didnt matched");
            setBtDis(false);
          }
        } else {
          setIsLoading(false);
          Alert.alert("Log in failed", "User and Password didnt matched");
          setBtDis(false);
        }
      })
    );
  };

  {
    /* for expo push notification */
  }
  useEffect(() => {
    let isMounted = true;

    registerForPushNotificationsAsync().then((token) => {
      if (isMounted) {
        setToken(token);

        setExpoPushToken(token);
      }
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
        // console.log("potatpot");
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        // navigation.navigate("BookTest");
      });

    return () => {
      isMounted = false;
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  _handleNotification = (notification) => {
    this.setState({ notification: notification });
  };

  _handleNotificationResponse = (response) => {};

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      setBtDis(false);
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // token = 'ExponentPushToken[ET7-LfDUYXePmkyQy8VyIl]'
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  /* for expo push notification */

  return (
    <View style={styles.container}>
      {isInitalLoading ? (
        <View style={styles.loadingScreen}>
          <Image
            source={require("../../assets/images/luniva360.png")}
            style={styles.loadingImage}
            resizeMethod={"resize"}
          />
          {/* <Text>potato</Text> */}
        </View>
      ) : (
        <>
          <View style={styles.componyInfo}>
            <Image
              source={require("../../assets/images/luniva360.png")}
              style={{
                width: 250,
                height: 100,
              }}
              resizeMethod={"resize"}
            />
            {/* <View style={styles.cDetails}>
          <Text style={[styles.span, styles.span1]}>Collector</Text>
          <Text style={[styles.span, styles.span2]}> App</Text>
        </View> */}
          </View>
          {/* <Text>{Token}</Text> */}
          <View style={styles.TextInputcontainer}>
            <Icon
              name="shop"
              color={global.secondary}
              type="entypo"
              style={styles.icon}
            ></Icon>
            <TextInput
              style={styles.TextInput}
              placeholder="clinet id.."
              onChangeText={(name) => setUserName(name)}
            ></TextInput>
          </View>

          <View style={styles.TextInputcontainer}>
            <Icon
              name="user"
              color={global.secondary}
              type="entypo"
              style={styles.icon}
            ></Icon>
            <TextInput
              style={styles.TextInput}
              placeholder="name.."
              onChangeText={(name) => setUserName(name)}
            ></TextInput>
          </View>

          <View style={styles.TextInputcontainer}>
            <Icon
              name="key"
              color={global.secondary}
              type="fontisto"
              style={styles.icon}
            ></Icon>
            <TextInput
              style={styles.TextInput}
              placeholder="password.."
              onChangeText={(password) => setPassword(password)}
              // keyboardType='visible-password'
              secureTextEntry
              textContentType="password"
            ></TextInput>
          </View>
          <LoginBtn title="login" onPress={handleLogin} disabled={btnDis} />

          {isLoading && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={isLoading}
              style={styles.centeredView}
            >
              <View style={styles.centeredView}>
                <ActivityIndicator size="large" color={global.secondary} />
              </View>
            </Modal>
          )}
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: "#FDFEFE",
    // justifyContent: 'center',
    // paddingTop: 100,
  },
  loadingScreen: {
    width: "100%",
    height: "100%",
    // backgroundColor: 'red',
    alignItems: "center",
  },
  loadingImage: {
    width: 250,
    height: 100,
    marginTop: 270,
  },
  title: {
    fontSize: 24,
    textTransform: "capitalize",
    marginBottom: 20,
    fontWeight: "bold",
  },
  TextInputcontainer: {
    borderWidth: 1,
    borderColor: "#f1f1df",
    width: windowWidth,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 20,
  },
  icon: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: "#FF7F00",
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  TextInput: {
    width: windowWidth - 60,
    marginLeft: 10,
    backgroundColor: "#FFFFFF",
    color: "#4c4747",
  },
  componyInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
    marginTop: 200,
  },
  cDetails: {
    flexDirection: "row",
    justifyContent: "center",
    // padding: 10,
  },
  span: {
    color: "#FF7F00",
    fontSize: 36,
    letterSpacing: 3,
  },
  span1: {
    fontWeight: "normal",
  },
  span2: {
    fontWeight: "bold",
  },
  centeredView: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fefefeb5",
    justifyContent: "center",
  },
});
