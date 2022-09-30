import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import MapView from "react-native-maps";
import { GetCurrentLocationOfuser } from "../../Services/appServices/Collector";
import { useDispatch } from "react-redux";
import MarkerCostome from "../../components/ui/MarkerCostome";
import { useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { GlobalStyles } from "../../GlobalStyle";

const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const CollectorMapScreen = ({ route }) => {
  console.log(route.params.data.UserId);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [coordinate, setcoordinate] = useState({
    latitude: 27.7172,
    longitude: 85.324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [isLoading, setisLoading] = useState(true);

  let today = new Date();
  const newDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  // let cData = {
  //   "entrydate": newDate,
  //   "userId": route.params.data.UserId
  // }
  // new api to get location

  useEffect(() => {
    const interval = setInterval(() => {
      let isMounted = true;
      dispatch(
        GetCurrentLocationOfuser(route.params.data.UserId, (res) => {
          if (res?.currentcollectorLocation.length > 0) {
            // let lat = Number(res?.collectorLocation[res?.collectorLocation.length - 1].Latitude);
            // let long = Number(res?.collectorLocation[res?.collectorLocation.length - 1].Longitude);
            let lat = Number(res?.currentcollectorLocation[0].Latitude);
            let long = Number(res?.currentcollectorLocation[0].Longitude);
            if (isMounted) {
              setcoordinate({
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
            }

            setisLoading(false);
          }
        })
      );
    }, 1000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Header title={`${route.params.data.UserName} Location`}></Header>

      <View style={styles.mapViewContainer}>
        {isLoading ? (
          <View style={GlobalStyles.loadingcontainer}>
            <ActivityIndicator size="large" color={global.secondary} />
          </View>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: coordinate.latitude,
              longitude: coordinate.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <MarkerCostome
              coordinate={coordinate}
              title={route.params.data.UserName}
              description={`user Id:${route.params.data.UserId}`}
              forCollector
            />
          </MapView>
        )}

        <View style={styles.bSheet}>
          <Avatar
            size={64}
            rounded
            source={require("../../assets/images/user.png")}
          />
          <View style={styles.details}>
            <Text style={styles.title}>{route.params.data.UserName}</Text>
            <Text style={styles.dis}>user id: {route.params.data.UserId}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CollectorMapScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 0.9,
    // backgroundColor: 'red'
  },
  mapViewContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 18,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    flex: 1,
  },
  bSheet: {
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    left: 10,
    right: 10,
    backgroundColor: "#fefefe",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    shadowColor: "#000",
    flexDirection: "row",
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
    color: "#205072",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  dis: {
    color: "#FF7F00",
    letterSpacing: 1,
    fontSize: 14,
    marginBottom: 4,
    textAlign: "justify",
  },
});
