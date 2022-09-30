import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../GlobalStyle";
import AppButton from "./AppButton";
import { useDispatch, useSelector } from "react-redux";
import { PostVerifyPatientReport } from "../../Services/appServices/ReportVerificationService";

const windowWidth = Dimensions.get("window").width;

// data Object {
//   "CheckedBy": null,
//   "D_group": 2,
//   "Designation": null,
//   "DigId": 38,
//   "GroupId": 2,
//   "GroupName": "BIO CHEMISTRY REPORT",
//   "IsCulture": false,
//   "Max": "60.0 - 130.0",
//   "Method": "GOD-POD",
//   "Note": null,
//   "PanId": 0,
//   "Panel": "BIO CHEMISTRY REPORT",
//   "Range": null,
//   "RecordId": 2,
//   "RegNo": null,
//   "Specimen": "Fluoride plasma(1ml) in Fasting",
//   "SubGroupId": false,
//   "SubUnit": "",
//   "TestResult": null,
//   "TestSubType": null,
//   "Testname": "Glucose F(FBS)",
//   "Units": "mg/dl",
//   "submethod": null,
//   "subresult": null,
//   "subtestId": null,
// }

// PostVerifyPatientReport

const TestVerificationCard = ({ data }) => {
  // console.log('pan id', data.PanId);
  // console.log('data', data.RecordId);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.storeUserData.userData);
  // console.log(user);

  const onVerify = () => {
    let today = new Date();
    const newDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "T" +
      today.toLocaleTimeString();

    let nData = {
      Id: 0,
      RecordId: data.RecordId,
      CreatedBy: user.UserId,
      CreatedOn: newDate,
      Remarks: `verified by ${user.UserName}, user id ${user.UserId}`,
      IsApproved: user.UserId,
      IsVerifier: true,
      IsActive: true,
      IsCurrent: true,
    };
    dispatch(
      PostVerifyPatientReport(nData, (res) => {
        // console.log("response", res);
        if (res.SuccessMsg === true) {
          Alert.alert("Sucess !", "sucessfully verified", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        } else {
          Alert.alert("Alert !", "Server error, Please try again laer", [
            {
              text: "OK",
              onPress: () => {},
            },
          ]);
        }
      })
    );
  };
  return (
    <View style={styles.cardCotainer}>
      <View style={[styles.cardBody, GlobalStyles.boxShadow]}>
        <View style={styles.cardLeft}>
          <Text style={[styles.ctitle, GlobalStyles.body]}>
            {data.Testname}
          </Text>
          <View style={styles.fdRow}>
            <Text style={[styles.ctitle, GlobalStyles.body]}>
              Test Result:{" "}
            </Text>
            <Text style={[styles.cBody, GlobalStyles.body]}>
              {data.TestResult}
            </Text>
          </View>
          <View style={styles.fdRow}>
            <Text style={[styles.ctitle, GlobalStyles.caption]}>Range: </Text>
            <Text style={[styles.cBody, GlobalStyles.caption]}>{data.Max}</Text>
          </View>
        </View>
        <AppButton title={"verify"} onPress={() => onVerify()}></AppButton>
      </View>
    </View>
  );
};

export default TestVerificationCard;

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardBody: {
    backgroundColor: "#fefefe",
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,

    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  cardLeft: {
    width: windowWidth * 0.5,
  },
  fdRow: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  ctitle: {
    color: primary,
  },
  cBody: {
    color: secondary,
  },
});
