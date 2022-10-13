import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Icon } from "react-native-elements";
import DateBadge from "./DateBadge";
import HamMenu from "./HamMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  GetNotificationByUserId,
  UpdateNotificationFlag,
} from "../../Services/appServices/Notificationservice";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../GlobalStyle";
import SeenBadge from "./SeenBadge";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const NotificationBtn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log(" user", user.UserId);
  // GetNotificationByUserId
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [Notification, setNotification] = useState();
  const [SeenNotification, setSeenNotification] = useState();
  const [UnseenNotification, setUnseenNotification] = useState();
  const [ViewAllVisible, setViewAllVisible] = useState(false);

  useEffect(() => {
    dispatch(
      GetNotificationByUserId(user.UserId, (res) => {
        // console.log(res?.notificationdetails);
        setNotification(res?.notificationdetails.reverse());
      })
    );
    filterData();
    setViewAllVisible(false);
  }, [modalVisible]);

  // console.log('notification list', Notification);

  const filterData = () => {
    if (Notification !== undefined) {
      let tempArr1 = [];
      let tempArr2 = [];
      Notification.map((e) => {
        if (e.IsSeen === false) {
          tempArr1.push(e);
        } else {
          tempArr2.push(e);
        }
      });
      // console.log('te3mp arr 1 not seen', tempArr2);
      setUnseenNotification(tempArr1);
      setSeenNotification(tempArr2);
    }
  };

  // UpdateNotificationFlag
  const handleClick = (el) => {
    // console.log('el', el.NId);
    dispatch(
      UpdateNotificationFlag(el.NId, (res) => {
        if (res === true) {
          setModalVisible(!modalVisible);
          navigation.navigate("NotificationHome", {
            data: el,
          });
        }
      })
    );
  };

  // "EntryDate": "2022-04-26T17:28:31.07",
  //   "IsSeen": false,
  //   "NId": 1,
  //   "NotficationPathName": "sample string 7",
  //   "NotificationDesc": "sample string 5",
  //   "Title": "sample string 4",
  //   "UserIdFrom": 3,
  //   "UserIdTo": 1,
  // NotificationHome
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, styles.boxShadow]}
      onPress={() => handleClick(item)}
    >
      <Icon
        name="test-tube-alt"
        color={"#9DD4E9"}
        type="fontisto"
        size={30}
        backgroundColor={"#ffffff"}
        style={{
          borderRadius: 12,
          padding: 10,
        }}
      ></Icon>
      <View style={styles.cardDetail}>
        <Text
          style={{
            marginBottom: 4.5,
          }}
        >
          <Text style={styles.cardTitle}>
            {item.Title}. {"\n"}
          </Text>

          <Text style={styles.cardDis}>{item.NotificationDesc}</Text>
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DateBadge date={item.EntryDate}></DateBadge>
          {item.IsSeen === true && <SeenBadge></SeenBadge>}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.top}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Icon
          name="bells"
          color={secodaryCardColor}
          type="antdesign"
          size={20}
          backgroundColor={"#ffffff"}
          style={{
            borderRadius: 10,
            padding: 10,
          }}
        ></Icon>
      </TouchableOpacity>
      {/* <Image
        source={require('../../assets/images/user.png')}
        style={{
          borderRadius: 10,
          width: 40,
          height: 40,
        }}
      /> */}
      <HamMenu></HamMenu>

      <Modal
        animationType="slide"
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setViewAllVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setViewAllVisible(false);
                }}
              >
                <Icon
                  name={"left"}
                  color={secodaryCardColor}
                  type="antdesign"
                  size={20}
                  backgroundColor={"#fefefe"}
                  style={{
                    borderRadius: 12,
                    padding: 10,
                  }}
                ></Icon>
              </TouchableOpacity>
              <Text style={styles.title}>Notifications</Text>
              <TouchableOpacity
                onPress={() => setViewAllVisible(!ViewAllVisible)}
              >
                <Text
                  style={{
                    color: "#fefefed1",
                    fontSize: 14,
                  }}
                >
                  {`${ViewAllVisible === true ? "Unseen" : "View all"}`}{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              style={styles.container}
              data={ViewAllVisible === true ? Notification : UnseenNotification}
              keyExtractor={(item, index) => `${item.NId}${index}`}
              renderItem={renderItem}
              // inverted={true}
              // initialScrollIndex={1}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NotificationBtn;

const styles = StyleSheet.create({
  top: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    width: windowWidth - 20,
    alignItems: "center",
  },
  centeredView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    color: "#fefefefe",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    alignItems: "center",
    // overflow: 'hidden';
  },
  card: {
    // backgroundColor: "#aae5f7ac",
    // backgroundColor: '#cbf0fc',
    backgroundColor: primaryBkg,
    width: windowWidth - 18,
    marginHorizontal: 9,
    paddingVertical: 9,
    paddingHorizontal: 18,
    // alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 9,
    borderRadius: 18,
  },
  cardDetail: {
    width: windowWidth * 0.7,
    // width: 200,
    // backgroundColor: 'blue'
  },
  cardTitle: {
    color: "#205072",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  cardDis: {
    color: "#2c2c309d",
    letterSpacing: 1,
    fontSize: 14,
    marginBottom: 4,
    textAlign: "justify",
  },
  container: {
    // height: 600,
    height: windowHeight - 60,
  },
});
