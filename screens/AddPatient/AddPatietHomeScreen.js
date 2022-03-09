import { StyleSheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AssignPatient, GetReferred, GetRequestor } from '../../Services/appServices/AssignPatient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { storeUserData } from '../../Services/store/slices/profileSlice';

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
  const [reqestorList, setRequestorlist] = useState();
  const [referedList, setReferedList] = useState();

  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  const [date, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState();
  const [time, setTime] = useState()
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const user = useSelector(state => state.storeUserData);
  console.log("user", user);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setNewDate(date.toLocaleDateString()) //toLocaleString
    setTime(date.toLocaleTimeString())
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  useEffect(() => {
    dispatch(GetRequestor((res) => {
      // console.log(res);
      setRequestorlist(res?.requestorList)
    }))
    dispatch(GetReferred((res) => {
      // console.log(res);
      setReferedList(res?.ReferredDoctorList)

    }))
  }, [])


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
        <View style={styles.TextInput}>
        <TextInput
          placeholder='Patient First Name'
          onChangeText={(fname) => setPatientFName(fname)}
        ></TextInput>
        </View>
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
        <Picker
          selectedValue={PatientGender}
          placeholder='gender'
          onValueChange={(itemValue, itemIndex) => setPatientGender(itemValue)}
        >
          <Picker.Item label='male' value="male" />
          <Picker.Item label='female' value="female" />
        </Picker>
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
          // selectedValue={PatientRequestorBy}
          style={styles.TextInput}
          onValueChange={(itemValue, itemIndex) => setPatientRequestorBy(itemValue)}
        >
          <Picker.Item label={'select requestor'} value={''} />
          {
            reqestorList !== undefined ?
              reqestorList.map((item) => (
                <Picker.Item label={item.Requestor} value={item.Id} key={item.Id} />
              )) : ''
          }
        </Picker>
        <Picker
          selectedValue={PatientReferedBy}
          onValueChange={(itemValue, itemIndex) => setPatientReferedBy(itemValue)}
        >
          <Picker.Item label={'select referer'} value={''} />
          {
            referedList !== undefined ?
              referedList.map((item) => (
                <Picker.Item label={item.Name} value={item.Id} key={item.Id} />
              )) : ''
          }
        </Picker>
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
        {/* <TextInput
          style={styles.TextInput}
          placeholder='Collection Date'
          onChangeText={(e) => setCollectionReqDate(e)}
          keyboardType='numeric'
        ></TextInput> */}

        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.TextInput}
        >
          <Text>{newDate === undefined ? 'date..' : newDate}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={showTimepicker}
          style={styles.TextInput}
        >
          <Text>{time === undefined ? 'time..' : time}</Text>
        </TouchableOpacity>
        {show &&
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={false}
            display="default"
            onChange={onChange}
          />
        }


      </ScrollView>
      <Button disabled={true} title='Submit' onPress={hndleSubmit}></Button>
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