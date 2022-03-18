import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// "_HomeRequest": {
//   "RId": 1,
//   "PatId": 2,
//   "TestTotalAmount": 3.0,
//   "CollectionCharge": 4.0,
//   "DiscountAmount": 5.0,
//   "GrandTotal": 6.0,
//   "Remarks": "sample string 7",
//   "UserId": 8,
//   "IsActive": true,
//   "CollectorId": 1
// },
// "_HomeCollectionTestList": [
//   {
//     "SId": 1,
//     "PatId": 2,
//     "RequestId": 3,
//     "TestId": 4,
//     "TestName": "sample string 5",
//     "TestPrice": 6.0,
//     "ClientId": 7,
//     "IsActive": true,
//     "EntryDate": "2022-03-18T16:55:21.2181249+05:45",
//     "UserId": 10
//   },


// new  from route Object {
//   "tests": Object {
//     "tests": Array [
//       Object {
//         "Id": 1,
//         "Price": 7000,
//         "Test": "EXECUTIVE HEALTH CHECK UP CATEGORY A",
//         "TestType": "Executive",
//       },
//       Object {
//         "Id": 2,
//         "Price": 5500,
//         "Test": "EXECUTIVE HEALTH CHECK UP CATEGORY B",
//         "TestType": "Executive",
//       },
//     ],
//     "total": 12500,
//   },
//   "userData": Object {
//     "CId": 1,
//     "CollectionReqDate": "2022-03-07T12:10:57.52",
//     "CollectorId": 2,
//     "EnterBy": 15,
//     "EntryDate": "2022-03-07T12:10:57.52",
//     "PatientAddress": "sample string 9",
//     "PatientAge": "sample str",
//     "PatientEmailId": "sample string 8",
//     "PatientFName": "sample string 3",
//     "PatientGender": "sample str",
//     "PatientLName": "sample string 5",
//     "PatientMName": "sample string 4",
//     "PatientNationalId": "sample string 12",
//     "PatientReferedBy": 10,
//     "PatientRequestorBy": 11,
//     "Remarks": "sample string 13",
//   },
// }

const BilligScreen = ({ route }) => {
  console.log('new data', route.params)
  const handleSubmit = () => {
    const uData = {
      "RId": 0,
      "PatId": 2,
      "TestTotalAmount": 3.0,
      "CollectionCharge": 4.0,
      "DiscountAmount": 5.0,
      "GrandTotal": 6.0,
      "Remarks": "sample string 7",
      "UserId": 8,
      "IsActive": true,
      "CollectorId": 1
    };
    const testData = []
  }
  return (
    <View>
      <Text>BilligScreen</Text>
    </View>
  )
}

export default BilligScreen

const styles = StyleSheet.create({})