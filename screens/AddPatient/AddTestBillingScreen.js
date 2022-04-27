import { Alert, Button, Dimensions, FlatList, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppButton from '../../components/ui/AppButton'
import { useDispatch, useSelector } from 'react-redux'
import { GetStatus, InsertUpdateHomeCollection } from '../../Services/appServices/AssignPatient'
import { Picker } from '@react-native-picker/picker'
import { StackActions, useNavigation } from '@react-navigation/native'
import Header from '../../components/Header'

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
const windowHeight = Dimensions.get('window').height;

// console.log('add billing section')

const AddTestBillingScreen = ({ route }) => {
  console.log('new data', route.params.patinetId);

  const [CollectionCharge, setCollectionCharge] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [TotalAmount, setTotalAmount] = useState(route.params.tests.total);
  const [Remarks, setRemarks] = useState('');
  const [isPaid, SetisPaid] = useState(true);
  const toggleSwitch = () => SetisPaid(previousState => !previousState);
  const [Status, setStatus] = useState();
  const [StatusList, setStatusList] = useState()
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [btnDis, setBtnDis] = useState(false);

  const user = useSelector(state => state.storeUserData);
  // console.log('user', user);
  const [paidStatus, setpaidStatus] = useState(1);
  const [ModalVisible, setModalVisible] = useState(false);
  const [PaymentCode, setPaymentCode] = useState('')

  useEffect(() => {
    dispatch(GetStatus((res) => {
      setStatusList(res?.sampleStatus[0]);
    }))
  }, [])
  // console.log(StatusList[0]);

  useEffect(() => {
    let temp = Number(route.params.tests.total) + Number(CollectionCharge) - Number(discount);
    setTotalAmount(temp);

  }, [discount, CollectionCharge])

  const renderItem = (({ item }) => (
    <View style={styles.testContainer}>

      <Text style={styles.testTitle}>{item.Test}</Text>
      <Text style={styles.testPrice}>Rs.{item.Price}</Text>
    </View>
  ))


  const handleSubmit = () => {
    setBtnDis(true);
    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;

    const _HomeRequest = {
      "RId": 0,
      "PatId": route.params.patinetId,
      "TestTotalAmount": route.params.tests.total,
      "CollectionCharge": CollectionCharge,
      "DiscountAmount": discount,
      "GrandTotal": TotalAmount,
      "Remarks": Remarks,
      "UserId":  user.userData.UserId,
      "IsActive": true,
      "CollectorId":  user.userData.UserId,
      "CollectedDate": fialEntryDate,
      "IsPaid": isPaid,
      "RequestStatus": Status,
      "PaymentType": paidStatus === 'card' ? `${paidStatus} - ${PaymentCode}` : paidStatus,
    };
    // array of testdata
    const _HomeCollectionTestList = []
    route.params.tests.testList.map(e => {
      
      _HomeCollectionTestList.push(
        {
          "SId": 0,
          "PatId": route.params.patinetId,
          "RequestId": 0,
          "TestId": e.TestId,
          "TestName": e.Test,
          "TestPrice": e.Price,
          "ClientId": 1,
          "IsActive": true,
          "EntryDate": fialEntryDate,
          "UserId":  user.userData.UserId
        }
      )
    })
    // console.log(_HomeCollectionTestList);
    // fial object to sed
    const finalData = {
      _HomeRequest,
      _HomeCollectionTestList
    }

    // console.log('final data',  finalData);
    // // console.log('test list', route.params.tests.testList);
    // return
  

    dispatch(InsertUpdateHomeCollection(finalData, (res) => {
      if (res?.SuccessMsg === true) { 
        // return
        Alert.alert(
          "Saved!",
          "Test booked Sucessfully",
          [
            {
              text: "OK", onPress: () => {
                const popAc = StackActions.pop(4);
                navigation.dispatch(popAc);
                navigation.navigate('Home');
              }
            }
          ]
        );
      }
      else {
        Alert.alert(
          "Failed!",
          "Test booked Failed",
          [
            { text: "OK", onPress: () => setBtnDis(false) }
          ]
        );
      }
    }))
    // setBtnDis(false)
  }
  return (
    <View style={styles.mainContainer}>
      <Header title={'bill'}></Header>
      <View style={styles.fatlistfContainer}>
        <FlatList
          data={route.params.tests.testList}
          renderItem={renderItem}
          keyExtractor={item => `${item.Id}${item.Test}`}
        ></FlatList>
      </View>

      <View style={styles.contaienr}>
        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Test Total Amount</Text>
          <Text style={styles.inputField}>{route.params.tests.total}</Text>
        </View>
        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Collector Charge</Text>
          <TextInput
            value={CollectionCharge}
            placeholder='Collector Charge'
            onChangeText={(e) => setCollectionCharge(e)}
            style={styles.inputField}
            keyboardType='numeric'
          ></TextInput>
        </View>

        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Discount Amount</Text>
          <TextInput
            value={discount}
            placeholder='Discount Amount'
            onChangeText={(e) => setDiscount(e)}
            style={styles.inputField}
            keyboardType='numeric'
          ></TextInput>
        </View>

        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Total Amount</Text>
          <Text style={styles.inputField}>{TotalAmount}</Text>
        </View>

        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Remarks</Text>
          <TextInput
            value={Remarks}
            placeholder='Remarks'
            onChangeText={(e) => setRemarks(e)}
            style={styles.inputField}
          // keyboardType='numeric'
          ></TextInput>
        </View>
        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Status</Text>
          <View style={styles.inputField}>

            <Picker
              selectedValue={Status}
              // style={styles.TextInput}
              onValueChange={(itemValue) => setStatus(itemValue)}
              mode='dropdown'
            >
              {
                StatusList !== undefined ?
                  <Picker.Item label={StatusList.SampleStatus} value={StatusList.StId} key={StatusList.StId} /> : null
              }

              {/* {
                StatusList !== undefined ?
                  StatusList.map((item, index) => (
                    <Picker.Item label={item.SampleStatus} value={item.StId} key={index} />
                  )) : null
              } */}
            </Picker>
          </View>
        </View>

        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>Payment mode</Text>
          <View style={styles.inputField}>

            <Picker
              selectedValue={paidStatus}
              // style={styles.TextInput}
              onValueChange={(itemValue) => setpaidStatus(itemValue)}
              mode='dropdown'
            >
              <Picker.Item label='cash' value={'cash'} key={'cash'} />
              <Picker.Item label='card' value={'card'} key={'card'} />
              <Picker.Item label='fone pay' value={'fone Pay'} key={'fone Pay'} />
              {/* <Picker.Item label='Due' value={4} key={4} />
              <Picker.Item label='credit' value={5} key={5} /> */}
            </Picker>
          </View>
        </View>
        {
          paidStatus === 'fone Pay' ?
            <TouchableOpacity onPress={() => setModalVisible(true)} style={{
              // width: windowWidth - 20,
              borderWidth: 1,
              borderColor: '#f1f1df',
              // justifyContent:'center',
              alignItems: 'center',
              padding: 10,
            }}>
              <Image
                source={require('../../assets/images/qr.png')}
                style={styles.qrSmall}
              ></Image>
            </TouchableOpacity> : null
        }
        {
          paidStatus === 'card' ?
            <View style={styles.TextInput}>
              <Text style={styles.formLabel}>Payment Code</Text>
              <TextInput
                value={PaymentCode}
                placeholder='PaymentCode'
                onChangeText={(e) => setPaymentCode(e)}
                style={styles.inputField}
              // keyboardType='numeric'
              ></TextInput>
            </View>
            : null
        }


        <View style={styles.TextInput}>
          <Text style={styles.formLabel}>IsPaid</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isPaid ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPaid}
          />
        </View>
        <AppButton title='handleSubmit' onPress={() => handleSubmit()} disabled={btnDis}></AppButton>
        {/* <Button title='kill it' onPress={() => {

          // const popAc = StackActions.pop(2);
          // navigation.dispatch(popAc);
          // navigation.navigate('Home');
          Alert.alert(
            "Patient Added Sucessfull",
            "Patient Added Sucessfull",
            [
              {
                text: "ok", onPress: () => {
                  const popAc = StackActions.pop(2);
                  navigation.dispatch(popAc);
                  navigation.navigate('Home');
                }
              }
            ]
          );
        }}></Button> */}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(!ModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <Image
            source={require('../../assets/images/qr.png')}
            style={styles.qrBig}
          ></Image>
          <View style={styles.componyInfo}>
            <Image
              source={require('../../assets/images/logo.png')}
            />
            <View style={styles.cDetails}>
              <Text style={[styles.span, styles.span1]}>Luniva</Text>
              <Text style={[styles.span, styles.span2]}>360</Text>
            </View>
            <AppButton title='close' onPress={() => setModalVisible(false)}></AppButton>
          </View>

        </View>
      </Modal>


    </View>
  )
}

export default AddTestBillingScreen

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 40,
    backgroundColor: '#8ED1FC',
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,

  },
  TextInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    width: windowWidth,

  },
  inputField: {
    borderWidth: 1,
    borderColor: '#f1f1df',
    borderRadius: 5,
    // backgroundColor: 'red'
    width: windowWidth * 0.45,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  testContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    marginBottom: 5,
    alignItems: 'center',

  },
  testTitle: {
    width: windowWidth * 0.6,
    fontSize: 14,
    letterSpacing: 1,
    color: '#fefefe'
  },
  testPrice: {
    color: '#232324',
    fontSize: 14
  },
  contaienr: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fefefe',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  formLabel: {
    color: "#4688B3",
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: 'bold'
  },
  fatlistfContainer: {
    height: windowHeight * 0.45,
    paddingBottom: 30,
    width: windowWidth,
    backgroundColor: '#8ED1FC',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#fefefe',
    // opacity: 0.8,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  qrSmall: {
    width: 40,
    height: 40,
  },
  qrBig: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  componyInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#f1f1df',
    width: windowWidth - 20,
    // marginLeft: 10,
    borderRadius: 18,
    paddingVertical: 20,
  },
  cDetails: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  span: {
    color: "#FF7F00",
    fontSize: 36,
    letterSpacing: 3,
  },
  span1: {
    fontWeight: 'normal',
  },
  span2: {
    fontWeight: 'bold',
  },
})