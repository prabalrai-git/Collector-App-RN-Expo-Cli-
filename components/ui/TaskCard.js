import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from './AppButton';
import CancleBtn from './CancleBtn';
import { useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width

// "SrId": 1,
//  "RequestId": 2,
//  "RequestStatusId": 3,
//  "EntryDate": "2022-03-22T10:57:37.8717928+05:45",
//  "UserId": 5,
//  "Remarks": "sample string 6"


// "CollectedDate": "2022-04-03T17:15:03",
// "CollectionCharge": 500,
// "CollectionReqDate": "2022-04-16T17:13:44",
// "CollectorId": 3,
// "DiscountAmount": 100,
// "GrandTotal": 6215,
// "IsPaid": true,
// "PatId": 66,
// "PatientAge": "26",
// "PatientFName": "Ram",
// "PatientGender": "male",
// "PatientLName": "Yadav",
// "PatientMName": "",
// "RId": 44,
// "Remarks": "Sik free",
// "RequestStatus": "Requested",
// "TestTotalAmount": 5815,


const TaskCard = ({ data }) => {
  console.log('data', data.RId);
  const [isVisibe, setisVisibe] = useState(false);
  const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState('');
  const user = useSelector(state => state.storeUserData);


  const hadleEvent = () => {
    setisVisibe(true)

  }

  const handleAccept = () => {
    // UpdateStatus
    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.toLocaleTimeString();
    const rData = {
      "SrId": 0,
      "RequestId": data.RId,
      "RequestStatusId": 3,
      "EntryDate": newDate,
      "UserId": user.userData.usrUserId,
      "Remarks": Remarks !== '' ? Remarks : '',
    }
    console.log('accepted data', rData);
  }

  const handleReject = () => {
    // UpdateStatus
    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.toLocaleTimeString();
    const aData = {
      "SrId": 0,
      "RequestId": data.RId,
      "RequestStatusId": 4,
      "EntryDate": newDate,
      "UserId": user.userData.usrUserId,
      "Remarks": Remarks !== '' ? Remarks : '',
    }
    console.log('rejected data', aData);
  }

  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity onPress={() => hadleEvent()} style={styles.cardCotainer}>
        <View style={styles.cardBody}>
          <Text style={styles.ctitle}>{data.PatientFName} {data.PatientLName}</Text>
          <Text style={styles.remarks}>{data.Remarks}</Text>
          <Text style={styles.cDate}>{data.CollectionReqDate}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibe}
        onRequestClose={() => {
          setisVisibe(!isVisibe)
          setisRemarksVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          {
            isRemarksVisible ?
              <View style={styles.TextInput}>
                <Text style={styles.formLabel}>Please write remarks on why you decline</Text>
                <TextInput
                  value={Remarks}
                  placeholder='Remarks'
                  onChangeText={(e) => setRemarks(e)}
                  style={styles.inputField}
                  multiline={true}
                // keyboardType='numeric'
                ></TextInput>

                <AppButton title='Send' onPress={() => {
                  setisVisibe(!isVisibe)
                  setisRemarksVisible(false)
                }}></AppButton>
              </View>

              :
              <View style={styles.module}>

                <CancleBtn title='Reject' color={'#e0c945'} onPress={() => setisRemarksVisible(true)}></CancleBtn>
                <Text>   </Text>
                <AppButton title='Accept' onPress={() => {
                  handleAccept()
                  setisVisibe(false)

                }}></AppButton>
              </View>


          }
        </View>
      </Modal>

    </>
  )
}

export default TaskCard

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

    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#205072',
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
  remarks: {
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
    width: 'auto'
  },
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe'
  },
  module: {
    // width: 200,
    // height: 200,
    flexDirection: 'row'
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'red',
    width: windowWidth * 0.92,
    minHeight: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
  }
})