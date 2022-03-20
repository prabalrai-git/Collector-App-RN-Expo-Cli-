import { Dimensions, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppButton from '../../components/ui/AppButton'
import { useDispatch } from 'react-redux'
import { InsertUpdateHomeCollection } from '../../Services/appServices/AssignPatient'
import { Button } from 'react-native-elements'
// "_HomeRequest": {
//   "RId": 1, //?? =0
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
//     "SId": 1, //?? =0
//     "PatId": 2,
//     "RequestId": 3, //?? =0
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
//     "testList": Array [
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

const windowWidth = Dimensions.get('window').width;

const BilligScreen = ({ route }) => {
  // console.log('new data', route.params);

  const [CollectionCharge, setCollectionCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(route.params.tests.total);
  const [Remarks, setRemarks] = useState('')

  const dispatch = useDispatch();


  useEffect(() => {
    let temp = Number(route.params.tests.total) + Number(CollectionCharge) - Number(discount)
    setTotalAmount(temp)
  }, [discount])

  const renderItem = (({ item }) => (
    <View style={styles.testContainer}>
      <Text style={styles.testTitle}>{item.Test}</Text>
      <Text style={styles.testPrice}>Rs.{item.Price}</Text>
    </View>
  ))

  const handleSubmit = () => {

    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;

    const _HomeRequest = {
      "RId": 0,
      "PatId": route.params.userData.CId,
      "TestTotalAmount": route.params.tests.total,
      "CollectionCharge": CollectionCharge,
      "DiscountAmount": discount,
      "GrandTotal": TotalAmount,
      "Remarks": Remarks,
      "UserId": route.params.userData.EnterBy,
      "IsActive": true,
      "CollectorId": route.params.userData.CollectorId
    };
    // array of testdata
    const _HomeCollectionTestList = []
    route.params.tests.testList.map(e => {
      _HomeCollectionTestList.push(
        {
          "SId": 0,
          "PatId": route.params.userData.CId,
          "RequestId": 0,
          "TestId": route.params.tests.testList.Id,
          "TestName": route.params.tests.testList.Test,
          "TestPrice": route.params.tests.testList.Price,
          "ClientId": route.params.userData.CId,
          "IsActive": true,
          "EntryDate": fialEntryDate,
          "UserId": route.params.userData.EnterBy
        }
      )
    })
    // console.log(_HomeCollectionTestList);
    // fial object to sed

    const finalData = {
      _HomeRequest,
      _HomeCollectionTestList
    }

    console.log(finalData)

    dispatch(InsertUpdateHomeCollection(finalData, (res) => {
      if (res?.SuccessMsg === true) {
        console.log('data saved');
      }
      else {
        console.log('error')
      }
    }))
  }
  return (
    <View style={styles.mainContainer}>
      <Text>BilligScreen</Text>
      <FlatList
        data={route.params.tests.testList}
        renderItem={renderItem}
        keyExtractor={item => item.Id}
      ></FlatList>
      <View style={styles.contaienr}>
        <View style={styles.TextInput}>
          <Text>Test Total Amount</Text>
          <Text style={styles.inputField}>{route.params.tests.total}</Text>
        </View>
        <View style={styles.TextInput}>
          <Text>Collector Charge</Text>
          <TextInput
            value={CollectionCharge}
            placeholder='Collector Charge'
            onChangeText={(e) => setCollectionCharge(e)}
            style={styles.inputField}
            keyboardType='numeric'
          ></TextInput>
        </View>

        <View style={styles.TextInput}>
          <Text>Discount Amount</Text>
          <TextInput
            value={discount}
            placeholder='Discount Amount'
            onChangeText={(e) => setDiscount(e)}
            style={styles.inputField}
            keyboardType='numeric'
          ></TextInput>
        </View>

        <View style={styles.TextInput}>
          <Text>Total Amount</Text>
          <Text style={styles.inputField}>{TotalAmount}</Text>
        </View>

        <View style={styles.TextInput}>
          <Text>Remarks</Text>
          <TextInput
            value={Remarks}
            placeholder='Remarks'
            onChangeText={(e) => setRemarks(e)}
            style={styles.inputField}
          // keyboardType='numeric'
          ></TextInput>
        </View>
      </View>


      <Text>Test list</Text>
      <Button title='handleSubmit' onPress={() => handleSubmit()}></Button>
    </View>
  )
}

export default BilligScreen

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 40,
  },
  TextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#232325',
    borderRadius: 5,
    // backgroundColor: 'red'
    width: windowWidth * 0.45,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  testContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.95,
    marginBottom: 5,
    alignItems: 'center',
  },
  testTitle: {
    width: windowWidth * 0.6,
    fontSize: 14,
    letterSpacing: 1
  },
  testPrice: {
    color: '#FFC285',
    fontSize: 14
  }
})