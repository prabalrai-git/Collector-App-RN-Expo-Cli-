import { StyleSheet, Text, TextInput, View, ScrollView, Button, Picker } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { AssignPatient, GetRequestor } from '../../Services/appServices/AssignPatient';

// {
//   "CId": 1,
//   "CollectorId": 2,
//   "PatientFName": "sample string 3",
//   "PatientMName": "sample string 4",
//   "PatientLName": "sample string 5",
//   "PatientAge": "sample string 6",
//   "PatientGender": "sample string 7",
//   "PatientEmailId": "sample string 8",
//   "PatientAddress": "sample string 9",
//   "PatientReferedBy": 10,
//   "PatientRequestorBy": 11,
//   "PatientNationalId": "sample string 12",
//   "Remarks": "sample string 13",
//   "EntryDate": "2022-03-08T11:56:10.5928734+05:45",
//   "EnterBy": 15,
//   "CollectionReqDate": "2022-03-08T11:56:10.5938722+05:45"
// }

const AddPatietHomeScreen = () => {
  // const [CId, setCId] = useState();
  // const [CollectorId, setCollectorId] = useState();
  const [PatientFName, setPatientFName] = useState();
  const [PatientMName, setPatientMName] = useState();
  const [PatientLName, setPatientLName] = useState();
  const [PatientAge, setPatientAge] = useState();
  const [PatientGender, setPatientGender] = useState();
  const [PatientEmailId, setPatientEmailId] = useState();
  const [PatientAddress, setPatientAddress] = useState();
  const [PatientReferedBy, setPatientReferedBy] = useState();
  const [PatientRequestorBy, setPatientRequestorBy] = useState();
  const [PatientNationalId, setPatientNationalId] = useState();
  const [Remarks, setRemarks] = useState();
  const [EntryDate, setEntryDate] = useState();
  const [EnterBy, setEnterBy] = useState();
  const [CollectionReqDate, setCollectionReqDate] = useState();

  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  dispatch(GetRequestor((res)=> {
    // console.log(res);
  }))


  const hndleSubmit = () => {
    setButDis(true)
    let data = {
      "CId": 0,
      "CollectorId": 10,
      "PatientFName": PatientFName,
      "PatientMName": PatientMName,
      "PatientLName": PatientLName,
      "PatientAge": PatientAge,
      "PatientGender": PatientGender,
      "PatientEmailId": PatientEmailId,
      "PatientAddress": PatientAddress,
      "PatientReferedBy": PatientReferedBy,
      "PatientRequestorBy": PatientRequestorBy,
      "PatientNationalId": PatientNationalId,
      "Remarks": Remarks,
      "EntryDate": EntryDate,
      "EnterBy": 10,
      "CollectionReqDate": CollectionReqDate
    }
    dispatch(AssignPatient(data, (res) => {
      if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
        console.log('message', res?.Message);
      }
    }))

  }


  return (
    <View>
      <ScrollView style={styles.container}>
        <TextInput
          style={styles.TextInput}
          placeholder='Patient First Name'
          onChangeText={(fname) => setPatientFName(fname)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='Patient Middle Name'
          onChangeText={(mname) => setPatientMName(mname)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='Patient Last Name'
          onChangeText={(lname) => setPatientLName(lname)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='gender'
          onChangeText={(gender) => setPatientGender(gender)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='email'
          onChangeText={(email) => setPatientEmailId(email)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='address'
          onChangeText={(address) => setPatientAddress(address)}
        ></TextInput>
        {/* <TextInput
        style={styles.TextInput}
        placeholder='refered by'
        onChangeText={(e) => setPatientReferedBy(e)}
      ></TextInput> */}
        <Picker
          selectedValue={PatientReferedBy}
          onValueChange={(itemValue, itemIndex) => setPatientReferedBy(itemValue)}
        >
          
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <TextInput
          style={styles.TextInput}
          placeholder='requested by'
          onChangeText={(e) => setPatientRequestorBy(e)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='patient national id'
          onChangeText={(e) => setPatientNationalId(e)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='remarks'
          onChangeText={(e) => setRemarks(e)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='entry date'
          onChangeText={(e) => setEntryDate(e)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='enter by'
          onChangeText={(age) => setEnterBy(age)}
        ></TextInput>
        <TextInput
          style={styles.TextInput}
          placeholder='Collection Date'
          onChangeText={(e) => setCollectionReqDate(e)}
          keyboardType='numeric'
        ></TextInput>
      </ScrollView>
      <Button disabled={butDis} title='Submit' onPress={hndleSubmit}></Button>
    </View>
  )
}

export default AddPatietHomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 1,
    paddingLeft: 1,
    paddingRight: 1,
    backgroundColor: '#fefefe'
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  TextInput: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderColor: '#f1f1df',
    color: '#4c4747',
    borderRadius: 4,
  },
})