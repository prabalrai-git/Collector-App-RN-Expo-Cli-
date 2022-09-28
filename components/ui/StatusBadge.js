import { StyleSheet, Text, View } from "react-native";
import React from "react";

const StatusBadge = ({ RequestStatus, IsPaid }) => {
  return (
    <View style={styles.badgeContainer}>
      {IsPaid === true ? (
        <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>Paid</Text>
      ) : (
        <Text style={[styles.badge, { backgroundColor: "#e43333" }]}>
          not paid
        </Text>
      )}
      {RequestStatus === "Requested" || RequestStatus === "Asigned" ? (
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge]}>Pending</Text>
        </View>
      ) : null}
      {RequestStatus === "Collected" ? (
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge]}>Pending</Text>
          <Text style={[styles.badge, { backgroundColor: "#19e0ee" }]}>
            {RequestStatus}
          </Text>
        </View>
      ) : null}
      {RequestStatus === "Accepted" ? (
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge]}>Pending</Text>
          <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
            {RequestStatus}
          </Text>
        </View>
      ) : null}
      {RequestStatus === "Rejected" ? (
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge, { backgroundColor: "#e43333" }]}>
            {RequestStatus}
          </Text>
        </View>
      ) : null}
      {RequestStatus === "Lab Received" ? (
        <View style={styles.badgeContainer}>
          <Text style={[styles.badge]}>Pending</Text>
          <Text style={[styles.badge, { backgroundColor: "#19e0ee" }]}>
            Collected
          </Text>
          <Text style={[styles.badge, { backgroundColor: "#33cfe4" }]}>
            {RequestStatus}
          </Text>
        </View>
      ) : null}
      {RequestStatus === "Report Dispatched" ? (
        <View style={styles.badgeContainer}>
          {/* <Text style={[styles.badge]}>pending</Text> */}
          {/* <Text style={[styles.badge, { backgroundColor: '#19e0ee' }]}>Collected</Text>
            <Text style={[styles.badge, { backgroundColor: '#33e4af' }]}>{RequestStatus}</Text> */}
          <Text style={[styles.badge, { backgroundColor: "#1db0dd" }]}>
            {RequestStatus}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

export default StatusBadge;

const styles = StyleSheet.create({
  badgeContainer: {
    // paddingVertical: 3,
    // paddingHorizontal: 5,
    // margin: 3,
    flexDirection: "row",
  },
  badge: {
    backgroundColor: "#f3ff49",
    color: "black",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 10,
    margin: 2,
  },
});
