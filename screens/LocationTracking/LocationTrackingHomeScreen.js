import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Header from "../../components/Header";
import { GetListOfCollector } from "../../Services/appServices/Collector";

const windowWidth = Dimensions.width;

const LocationTrackingHomeScreen = () => {
  const [CollectorList, setCollectorList] = useState();
  const [NewData, setNewData] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [disable, setdisable] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (isFocused) {
      dispatch(
        GetListOfCollector((res) => {
          // console.log('response', res.userToken);
          setCollectorList(res.GetListOfCollectors);
        })
      );
    }
    setdisable(false);
  }, [isFocused]);

  const hadleEvent = (e) => {
    navigation.navigate("CollectorMapScreen", {
      data: e,
    });
  };

  const renderItem = ({ item }) => (
    <Pressable onPress={() => hadleEvent(item)} style={styles.cardCotainer}>
      <View style={styles.cardBody}>
        <View style={styles.card}>
          <View style={styles.cDetail}>
            <Text style={styles.ctitle}>{item.UserName}</Text>
            <Text style={styles.subheading}>User Id: {item.UserId}</Text>
            {/* <DateBadge date={data.CollectionReqDate}></DateBadge> */}
          </View>

          {/* <BadgeStatus RequestStatus={data.SampleStatus} IsPaid={data.IsPaid}></BadgeStatus> */}
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.mainContainer}>
      <Header title={"Collectors"}></Header>
      <View style={styles.container}>
        <FlatList
          data={CollectorList}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.CId}${item.UserId}`}
        />
      </View>
    </View>
  );
};

export default LocationTrackingHomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    // marginTop: 40,
    flex: 1,
  },
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },

  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "space-between",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#205072",
    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  subheading: {
    color: "#253539",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  },
  cDate: {
    color: "#fefefe",
    fontSize: 10,
    letterSpacing: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#ff7f00",
    borderRadius: 10,
    width: "auto",
  },
  centeredView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
});
