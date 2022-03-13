import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform, Dimensions, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AssignPatient, GetReferred, GetRequestor } from '../../Services/appServices/AssignPatient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BottomSheet, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation()
  const [PatientFName, setPatientFName] = useState();
  const [PatientMName, setPatientMName] = useState('');
  const [PatientLName, setPatientLName] = useState();
  const [PatientAge, setPatientAge] = useState();
  const [PatientGender, setPatientGender] = useState();
  const [PatientEmailId, setPatientEmailId] = useState();
  const [PatientAddress, setPatientAddress] = useState();
  const [PatientReferedBy, setPatientReferedBy] = useState();
  const [PatientRequestorBy, setPatientRequestorBy] = useState();
  const [PatientNationalId, setPatientNationalId] = useState();
  const [Remarks, setRemarks] = useState();
  const [reqestorList, setRequestorlist] = useState();
  const [referedList, setReferedList] = useState();

  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  // const [date, setDate] = useState('');
  // const [initaldate, setinitalDate] = useState(new Date());
  // // const [newDate, setNewDate] = useState();
  // const [time, setTime] = useState('')
  // const [mode, setMode] = useState('date');
  // const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Apple', value: 'apple'},
  //   {label: 'Banana', value: 'banana'}
  // ]);

  const user = useSelector(state => state.storeUserData);
  const [isVisible, setIsVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || date;
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || time;
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
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

  const handleAddress = (lat, long) => {
    const temp = {
      'latitude': lat,
      'longitude': long
    }
    setPatientAddress(temp);
    setIsVisible(!isVisible);
  }


  const hndleSubmit = () => {

    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;

    // const fialReportReqDate = date.toLocaleDateString + 'T' + time.toLocaleTimeString;
    // console.log(time.toLocaleTimeString());

    setButDis(true)
    let data = {
      "CId": 0,
      "CollectorId": user.userData.usrUserId,
      "PatientFName": PatientFName,
      "PatientMName": PatientMName,
      "PatientLName": PatientLName,
      "PatientAge": PatientAge,
      "PatientGender": PatientGender,
      "PatientEmailId": PatientEmailId,
      "PatientAddress": JSON.stringify(PatientAddress),
      "PatientReferedBy": PatientReferedBy,
      "PatientRequestorBy": PatientRequestorBy,
      "PatientNationalId": PatientNationalId,
      "Remarks": Remarks,
      "EntryDate": fialEntryDate,
      "EnterBy": user.userData.usrUserId,
      "CollectionReqDate": `${time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()}T${time.toLocaleTimeString()}`
    }
    if (
      typeof data.CollectorId !== 'undefined' &&
      typeof data.PatientFName !== 'undefined' &&
      typeof data.PatientLName !== 'undefined' &&
      typeof data.PatientAge !== 'undefined' &&
      typeof data.PatientGender !== 'undefined' &&
      typeof data.PatientEmailId !== 'undefined' &&
      typeof data.PatientAddress !== 'undefined' &&
      typeof data.PatientReferedBy !== 'undefined' &&
      typeof data.PatientRequestorBy !== 'undefined' &&
      typeof data.PatientNationalId !== 'undefined' &&
      typeof data.CollectionReqDate !== 'undefined'
      ) {
      dispatch(AssignPatient(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {
          console.log('message', res?.Message);
          setPatientFName('');
          setPatientMName('');
          setPatientLName('');
          setPatientAge('');
          setPatientGender('');
          setPatientEmailId('');
          setPatientAddress('');
          setPatientReferedBy('');
          setPatientRequestorBy('');
          setPatientNationalId('');
          setRemarks('');
          
          Alert.alert(
            "Saved !",
            [
              { text: "OK", onPress: () => navigation.navigate('Home')}
            ]
          );
          
        } else {
          console.log('no data saved');
          
        }
        setButDis(false);
      }))
    }else{
      
      Alert.alert(
        "Erroe !",
        "Data not saved",
        [
          { text: "OK", onPress: () => setButDis(false) }
        ]
      );
    }


  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.TextInput}>
          <TextInput
            value={PatientFName}
            placeholder='Patient First Name'
            onChangeText={(fname) => setPatientFName(fname)}
          ></TextInput>
        </View>
        <View style={styles.TextInput}>
          <TextInput
            value={PatientMName}
            placeholder='Patient Middle Name'
            onChangeText={(mname) => setPatientMName(mname)}
          ></TextInput>
        </View>
        <View style={styles.TextInput}>
          <TextInput
            value={PatientLName}
            placeholder='Patient Last Name'
            onChangeText={(lname) => setPatientLName(lname)}
          ></TextInput>
        </View>

        <Picker
          selectedValue={PatientGender}
          placeholder='gender'
          style={styles.TextInput}
          onValueChange={(itemValue, itemIndex) => setPatientGender(itemValue)}
        >
          <Picker.Item label='select gender' value='select gender' />
          <Picker.Item label='male' value='male' />
          <Picker.Item label='female' value='female' />
        </Picker>
        <View style={styles.TextInput}>
          <TextInput
            value={PatientEmailId}
            placeholder='email'
            onChangeText={(email) => setPatientEmailId(email)}
          ></TextInput>
        </View>
        <View style={styles.TextInput}>
          {/* <TextInput
            value={PatientAddress}
            placeholder='address'
            onChangeText={(address) => setPatientAddress(address)}
          
          ></TextInput> */}
          <View>
            <Text>latitude:{JSON.stringify(region.latitude)}</Text>
            <Text>longitude:{JSON.stringify(region.longitude)}</Text>
          </View>
          <Button title='address' onPress={() => setIsVisible(true)}></Button>
        </View>
        <View style={styles.TextInput}>
          <TextInput
            value={PatientAge}
            placeholder='patient age'
            onChangeText={(e) => setPatientAge(e)}
            keyboardType='number-pad'
          ></TextInput>
        </View>
        <Picker
          selectedValue={PatientRequestorBy}
          style={styles.TextInput}
          onValueChange={(itemValue) => setPatientRequestorBy(itemValue)}
        >
          <Picker.Item label={'select requestor'} value={''} />
          {
            reqestorList !== undefined ?
              reqestorList.map((item, index) => (
                <Picker.Item label={item.Requestor} value={item.Id} key={index} />
              )) : null
          }
        </Picker>
        <Picker
          selectedValue={PatientReferedBy}
          style={styles.TextInput}
          onValueChange={(itemValue) => setPatientReferedBy(itemValue)}
        >
          <Picker.Item label={'select referer'} value={''} />
          {
            referedList !== undefined ?
              referedList.map((item, index) => (
                <Picker.Item label={item.Name} value={item.Id} key={index} />
              )) : null
          }
        </Picker>

        {/* <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true}
      /> */}
        <View style={styles.TextInput}>
          <TextInput
            value={PatientNationalId}
            placeholder='patient national id'
            onChangeText={(e) => setPatientNationalId(e)}
          ></TextInput>
        </View>
        <View style={styles.TextInput}>
          <TextInput
            value={Remarks}
            placeholder='remarks'
            onChangeText={(e) => setRemarks(e)}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.TextInput}
        >
          <Text>{date === '' ? 'date..' : date.toLocaleDateString()}, {time === '' ? 'time..' : time.toLocaleTimeString()}</Text>
        </TouchableOpacity>

        {show &&
          <DateTimePicker
            testID="dateTimePicker"
            // timeZoneOffsetInMinutes={0}
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        }



        <Button disabled={butDis} title='Submit' onPress={hndleSubmit}></Button>
      </ScrollView>

      <BottomSheet modalProps={{}} isVisible={isVisible}>
        <View style={{ flex: 1 }}>
          <MapView
            style={styles.map}
            initialRegion={{
              // latitude: geolocation.latitude === null ? 27.7172 : geolocation.latitude,
              // longitude: geolocation.longitude === null ? 85.3240 : geolocation.longitude,
              latitude: 27.7172,
              longitude: 85.3240,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            {console.log(region)}
          </MapView>
          <View style={styles.cMarker}>
            <Image
              source={require('../../assets/images/collector.png')}
              style={styles.cMarkerImg}
            ></Image>
          </View>
          <View
            style={styles.bSheet}
          >
            <Button title='cancle' onPress={() => setIsVisible(false)} color={'#ffc107'} buttonStyle={{backgroundColor: 'yellow'}}/>
            <View>
              <Text>latitude:{JSON.stringify(region.latitude)}</Text>
              <Text>longitude:{JSON.stringify(region.longitude)}</Text>
            </View>
            <Button title='save' onPress={() => handleAddress(region.latitude, region.longitude)} />
          </View>

        </View>

      </BottomSheet>

    </View>
  )
}

export default AddPatietHomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // marginVertical: 40,
    // paddingBottom: 1,
    // paddingLeft: 1,
    // paddingRight: 1,
    // backgroundColor: '#fefefe',
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
    width: Dimensions.get('window').width * 0.96,
    padding: 10,
    marginBottom: 20,
    color: '#4c4747',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#95957abd',
    backgroundColor: '#fefefe'
  },
  btn: {
    marginTop: 10,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bSheet: {
    position: 'absolute',
    bottom: 0,
    left: 10,
    right: 10,
    // height: 100,
    backgroundColor: '#fefefe',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  cMarker: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'

  },
  cMarkerImg: {
    width: 20,
    resizeMode: 'contain',
  }
})