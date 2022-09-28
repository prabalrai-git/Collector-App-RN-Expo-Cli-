import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import React, { useState } from "react";

import { Icon } from "react-native-elements";
import BadgeStatus from "./BadgeStatus";
import DateBadge from "./DateBadge";
import { GlobalStyles } from "../../GlobalStyle";

const windowWidth = Dimensions.get("window").width;

const PreTestCard = ({ data, disable, retDis }) => {
  // console.log('data', data.SampleStatus);
  const [isVisibe, setisVisibe] = useState(false);
  const tests = data.Test;
  const TestList = tests.split(",");
  // const [active, setActive] = useState(false);

  const hadleEvent = () => {
    setisVisibe(true);
    retDis(true);
  };

  return (
    <>
      <Pressable
        disabled={disable}
        onPress={() => hadleEvent()}
        style={styles.cardCotainer}
      >
        <View style={styles.cardBody}>
          <Icon
            name={"lab-flask"}
            color={"#FF7F00"}
            type="entypo"
            style={styles.icon}
            size={30}
          ></Icon>
          <View style={styles.card}>
            <Text style={styles.ctitle}>Request Id: {data.RId}</Text>
            <DateBadge date={data.CollectedDate}></DateBadge>
          </View>
          <BadgeStatus RequestStatus={data.SampleStatus}></BadgeStatus>
        </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibe}
        onRequestClose={() => {
          setisVisibe(!isVisibe);
          retDis(false);
          // setActive(true);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={{
              position: "absolute",
              top: 7,
              right: 10,
              backgroundColor: secodaryCardColor,
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              setisVisibe(false);
              // setisRemarksVisible(false)
              retDis(false);
            }}
          >
            <Icon
              name={"close"}
              color={"#fefefe"}
              type="antdesign"
              size={20}
            ></Icon>
          </Pressable>

          <View style={styles.patInfocontainer}>
            <View style={styles.profile}>
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.name, { color: "#FF7F00" }]}>
                  Request ID :
                </Text>
                <Text style={styles.name}> {data.RId}</Text>
              </View>
            </View>
            <View style={[styles.cardContainer, GlobalStyles.boxShadow]}>
              <View style={styles.flatListContainer}>
                <Text style={styles.title}>Tests</Text>
                {TestList !== undefined
                  ? TestList.map((e) => (
                      <View style={styles.testCard} key={e.TestName}>
                        <Text style={styles.testsText}>{e}</Text>
                        {/* <Text style={styles.testsPrice}>Rs.{e.TestPrice}</Text> */}
                      </View>
                    ))
                  : null}
              </View>
              <View>
                <Text style={styles.title}>Payment Details</Text>
                <View style={styles.testCard}>
                  <Text style={styles.testsText}>Total</Text>
                  <Text style={styles.finsltestsPrice}>
                    Rs.{data.TestTotalAmount}
                  </Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.testsText}>Collection Charge</Text>
                  <Text style={styles.finsltestsPrice}>
                    Rs.{data.CollectionCharge}
                  </Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.testsText}>Discount Amout</Text>
                  <Text style={styles.finsltestsPrice}>
                    Rs.{data.DiscountAmount}
                  </Text>
                </View>
                <View style={styles.testCard}>
                  <Text style={styles.testsText}>Grand Total</Text>
                  <Text style={styles.finsltestsPrice}>
                    Rs.{data.GrandTotal}
                  </Text>
                </View>
              </View>
            </View>

            {data.SampleStatus === "Rejected" && (
              <View style={[styles.testList, { backgroundColor: "#f36f5e" }]}>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Sample Rejcted
                </Text>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 1,
                  }}
                >
                  Due to perticular reason, the sample has been rejected.
                </Text>
              </View>
            )}

            {data.SampleStatus === "Collected" && (
              <View style={[styles.testList, { backgroundColor: "#f36f5e" }]}>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Sample Collected
                </Text>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 1,
                  }}
                >
                  Sample has been collected, by user ID
                </Text>
              </View>
            )}

            {data.SampleStatus === "Lab Received" && (
              <View style={[styles.testList, { backgroundColor: "#5ebcf3" }]}>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Sample Lab Collected
                </Text>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 1,
                  }}
                >
                  Sample has been received By lab
                </Text>
              </View>
            )}

            {data.SampleStatus === "Report Dispatched" && (
              <View style={[styles.testList, { backgroundColor: "#5ebcf3" }]}>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 18,
                    marginBottom: 10,
                    fontWeight: "bold",
                    letterSpacing: 1,
                  }}
                >
                  Report Dispatched
                </Text>
                <Text
                  style={{
                    color: "#fefefe",
                    fontSize: 16,
                    marginBottom: 10,
                    letterSpacing: 1,
                  }}
                >
                  The Report is submited
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PreTestCard;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  centeredView: {
    width: "100%",
    flex: 1,
    backgroundColor: "#141516e1",
    // backgroundColor: '#fefefe'
  },

  patInfocontainer: {
    width: windowWidth - 20,
    flex: 1,
    marginLeft: 10,
  },

  profile: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  name: {
    // color: '#205072',
    color: secondaryBkg,
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginBottom: 6,
  },
  flatListContainer: {
    width: windowWidth - 20,
    maxHeight: 200,
  },
  title: {
    fontSize: 20,
    color: "#205072",
    fontWeight: "bold",
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  testCard: {
    flexDirection: "row",
    marginVertical: 3,
    // paddingHorizontal: 5,
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
  },
  testsText: {
    color: "#232325",
    fontSize: 14,
    letterSpacing: 1.2,
  },
  finsltestsPrice: {
    borderWidth: 1,
    borderColor: "#efed11",
    width: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 3,
  },
  cardContainer: {
    // borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "#fefefe",
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  testList: {
    backgroundColor: "#9DD4E9",
    // marginLeft: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    width: windowWidth - 20,
  },
});
