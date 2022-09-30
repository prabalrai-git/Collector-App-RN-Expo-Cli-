import { StyleSheet, Text, View } from "react-native";
import React from "react";
// Report Completed
const BadgeStatus = ({
  RequestStatus,
  IsPaid,
  PaymentType,
  ReportDelivery,
}) => {
  // console.log("ReportDelivery", ReportDelivery);
  // Delivered Manual, undefined, null

  return (
    <View>
      {IsPaid ? (
        IsPaid === true ? (
          <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
            Paid
          </Text>
        ) : (
          <Text style={[styles.badge, { backgroundColor: "#e43333" }]}>
            Not Paid
          </Text>
        )
      ) : null}

      {(RequestStatus === "Requested" || RequestStatus === "Asigned") && (
        <Text style={[styles.badge]}>Pending</Text>
      )}
      {RequestStatus === "Collected" && (
        <View>
          <Text style={[styles.badge]}>Not Dropped</Text>
          <Text style={[styles.badge, { backgroundColor: "#19e0ee" }]}>
            {RequestStatus}
          </Text>
        </View>
      )}
      {RequestStatus === "Accepted" && (
        <View>
          <Text style={[styles.badge]}>Pending</Text>
          <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
            {RequestStatus}
          </Text>
        </View>
      )}
      {RequestStatus === "Rejected" && (
        <Text style={[styles.badge, { backgroundColor: "#e43333" }]}>
          {RequestStatus}
        </Text>
      )}
      {RequestStatus === "Lab Received" && (
        <Text style={[styles.badge, { backgroundColor: "#33cfe4" }]}>
          {RequestStatus}
        </Text>
      )}
      {RequestStatus === "Report Dispatched" && (
        <Text style={[styles.badge, { backgroundColor: "#1db0dd" }]}>
          {RequestStatus}
        </Text>
      )}

      {RequestStatus === "Pending" && (
        <Text style={[styles.badge, { backgroundColor: "#faf06a" }]}>
          {RequestStatus}
        </Text>
      )}
      {RequestStatus === "Report Completed" && (
        <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
          {RequestStatus}
        </Text>
      )}

      {PaymentType === "Cash" && (
        <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
          {PaymentType}
        </Text>
      )}
      {PaymentType === "Bank" && (
        <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
          {PaymentType}
        </Text>
      )}
      {PaymentType === "Credit" && (
        <Text style={[styles.badge, { backgroundColor: "#1db0dd" }]}>
          {PaymentType}
        </Text>
      )}
      {PaymentType === "DueCollection" && (
        <Text style={[styles.badge, { backgroundColor: "#faf06a" }]}>
          {PaymentType}
        </Text>
      )}
      {ReportDelivery === undefined || ReportDelivery === null ? (
        <Text style={[styles.badge, { backgroundColor: "#faf06a" }]}>
          Not Delivered
        </Text>
      ) : (
        <Text style={[styles.badge, { backgroundColor: "#a3ee19" }]}>
          {ReportDelivery}
        </Text>
      )}
    </View>
  );
};

export default BadgeStatus;

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#faf06a",
    color: "#fefefe",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 10,
    marginVertical: 2,
    textAlign: "center",
  },
});
