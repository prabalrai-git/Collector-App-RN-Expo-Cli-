import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Platform, Dimensions, Image, Alert, FlatList, KeyboardAvoidingView, SafeAreaView, Keyboard, BackHandler, Modal, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AssignPatient, GetReferred, GetRequestor } from '../../Services/appServices/AssignPatient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { BottomSheet, Button, Icon, Input } from 'react-native-elements';
import MapView from 'react-native-maps';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Filter from '../../components/ui/Filter';
import TestCard from '../../components/ui/TestCard';
import AppButton from '../../components/ui/AppButton';
import HamMenu from '../../components/ui/HamMenu';
import BackBtn from '../../components/ui/BackBtn';

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
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation()
  const [PatientFName, setPatientFName] = useState();
  const [PatientMName, setPatientMName] = useState('');
  const [PatientLName, setPatientLName] = useState();
  const [PatientAge, setPatientAge] = useState();
  const [PatientGender, setPatientGender] = useState();
  const [PatientEmailId, setPatientEmailId] = useState();
  const [PatientAddress, setPatientAddress] = useState(
    {
      'latitude': 27.7172,
      'longitude': 85.3240,
    }
  );
  const [PatientReferedBy, setPatientReferedBy] = useState();
  const [PatientRequestorBy, setPatientRequestorBy] = useState();
  const [PatientNationalId, setPatientNationalId] = useState();
  const [Remarks, setRemarks] = useState();
  const [reqestorList, setRequestorlist] = useState();
  const [referedList, setReferedList] = useState();

  const dispatch = useDispatch();
  const [butDis, setButDis] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const user = useSelector(state => state.storeUserData);
  const [isVisible, setIsVisible] = useState(false);

  const [errors, setErrors] = useState({});

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
    //  let temp = {reqestorList, referedList}
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
    // navigation.navigate('AddPatientSelectTest', {
    //   patinetId: 51
    // })
    // return
    console.log("1st");
    setIsLoading(true);
    setButDis(true);

    console.log('pressed');
    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;



    let data = {
      "CId": 0,
      "CollectorId": user.userData.usrUserId,
      "PatientFName": PatientFName,
      "PatientMName": PatientMName !== '' ? PatientMName : '',
      "PatientLName": PatientLName,
      "PatientAge": PatientAge,
      "PatientGender": PatientGender,
      "PatientEmailId": PatientEmailId !== '' || PatientEmailId !== undefined ? PatientEmailId : '',
      "PatientAddress": JSON.stringify(PatientAddress),
      "PatientReferedBy": PatientReferedBy,
      "PatientRequestorBy": PatientRequestorBy,
      "PatientNationalId": PatientNationalId,
      "Remarks": Remarks,
      "EntryDate": fialEntryDate,
      "EnterBy": user.userData.usrUserId,
      "CollectionReqDate": `${time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()}T${time.toLocaleTimeString()}`,
    }

    // console.log('PatientFName 1', isValid);
    // validate()
    // console.log('PatientFName 3', isValid);
    let isValidated = validate();
    console.log("isValidated", isValidated);
    if (isValidated) {
      if (
        typeof data.CollectorId !== 'undefined' &&
        typeof data.PatientFName !== 'undefined' &&
        typeof data.PatientLName !== 'undefined' &&
        typeof data.PatientAge !== 'undefined' &&
        typeof data.PatientGender !== 'undefined' &&
        typeof data.PatientAddress !== 'undefined' &&
        typeof data.PatientReferedBy !== 'undefined' &&
        typeof data.PatientRequestorBy !== 'undefined' &&
        typeof data.PatientNationalId !== 'undefined' &&
        typeof data.CollectionReqDate !== 'undefined'

      ) {
        dispatch(AssignPatient(data, (res) => {
          if (res?.CreatedId > 0 && res?.SuccessMsg === true) {

            setPatientFName(undefined);
            setPatientMName('');
            setPatientLName(undefined);
            setPatientAge(undefined);
            setPatientGender(undefined);
            setPatientEmailId(undefined);
            setPatientAddress(undefined);
            setPatientReferedBy(undefined);
            setPatientRequestorBy(undefined);
            setPatientNationalId(undefined);
            setRemarks(undefined);


            setIsLoading(false);
            Alert.alert(
              "Saved!",
              "Data saved Sucessfully",
              [
                {
                  text: "OK", onPress: () => navigation.navigate('AddPatientSelectTest', {
                    patinetId: res.CreatedId
                  })
                }
              ]
            );

          } else {
            setIsLoading(false);
            Alert.alert(
              "Failure",
              "Data not saved",
              [
                { text: "OK" }
              ]
            );
          }
          setButDis(false);
        }))
      } else {
        setIsLoading(false);
        Alert.alert(
          "Error !",
          "Please fill up the input values",
          [
            { text: "OK", onPress: () => setButDis(false) }
          ]
        );
        setButDis(false);
      }
    } else {
      setButDis(false);
      setIsLoading(false);
    }

console.log("last");
  }


  const validate = () => {
    Keyboard.dismiss();
    console.log('PatientFName 3', isValid);
    let isOpValid = true
    if (PatientFName === '' || PatientFName === undefined) {
      handleError('please enter valid First Name', 'PatientFName')
      isOpValid = false
    }
    if (PatientLName === '' || PatientLName === undefined) {
      handleError('please enter valid Middle Name', 'PatientLName')
      isOpValid = false
    }
    if (PatientAge === '' || PatientAge === undefined) {
      handleError('please enter valid Middle Name', 'PatientAge')
      isOpValid = false
    }
    if (PatientNationalId === '' || PatientNationalId === undefined) {
      handleError('please enter valid Middle Name', 'PatientNationalId')
      isOpValid = false
    }
    if (Remarks === '' || Remarks === undefined) {
      handleError('please enter valid remarks', 'Remarks')
      isOpValid = false
    }
    return isOpValid;
  }
  const handleError = (error, input) => {
    setErrors(prevState =>
      ({ ...prevState, [input]: error }));
  };

  return (
    <SafeAreaView>


      <ImageBackground
        source={require('../../assets/images/bkg1.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      >

        <HamMenu></HamMenu>
        <BackBtn></BackBtn>
        <View style={styles.maincontainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Add Patient</Text>
            <ScrollView>
              
              
                <Input
                  value={PatientFName}
                  placeholder='First Name'
                  onChangeText={(fname) => setPatientFName(fname)}
                  onFocus={() => handleError(null, 'PatientFName')}
                  label="Full Name"
                  errorMessage={errors.PatientFName}

                />

                <Input
                  value={PatientMName}
                  placeholder='Middle Name'
                  onChangeText={(mname) => setPatientMName(mname)}
                  onFocus={() => handleError(null, 'PatientMName')}
                  label="Middle Name"
                  errorMessage={errors.PatientMName}
                />

                <Input
                  value={PatientLName}
                  placeholder='Last Name'
                  onChangeText={(lname) => setPatientLName(lname)}
                  onFocus={() => handleError(null, 'PatientLName')}
                  label="Middle Name"
                  errorMessage={errors.PatientLName}
                />

                <View style={styles.TextInput}>
                  <View style={styles.PickerTextInput}>
                    <Picker
                      selectedValue={PatientGender}
                      placeholder='gender'
                      onValueChange={(itemValue, itemIndex) => setPatientGender(itemValue)}
                      mode='dropdown'
                    >
                      <Picker.Item label='select gender' value='select gender' />
                      <Picker.Item label='male' value='male' />
                      <Picker.Item label='female' value='female' />
                    </Picker>
                  </View>
                </View>

                <Input
                  value={PatientEmailId}
                  placeholder='email'
                  onChangeText={(email) => setPatientEmailId(email)}
                  onFocus={() => handleError(null, 'PatientEmailId')}
                  label="email"
                  errorMessage={errors.PatientEmailId}
                />

                <View style={styles.TextInput}>
                  <TouchableOpacity style={styles.inputField} onPress={() => setIsVisible(true)}>
                    <View style={{
                      flexDirection: 'row'
                    }}>
                      <Text>{JSON.stringify(region.latitude)}, </Text>
                      <Text>{JSON.stringify(region.longitude)}</Text>
                    </View>
                    <Icon
                      name='location-pin'
                      color={'#FF7F00'}
                      type='entypo'
                      style={styles.icon}
                    ></Icon>
                  </TouchableOpacity>
                </View>

                <Input
                  value={PatientAge}
                  placeholder='Age'
                  onChangeText={(e) => setPatientAge(e)}
                  keyboardType='number-pad'
                  onFocus={() => handleError(null, 'PatientAge')}
                  label="Age"
                  errorMessage={errors.PatientAge}
                />


                <View style={styles.TextInput}>
                  <View style={styles.PickerTextInput}>
                    <Picker
                      selectedValue={PatientRequestorBy}
                      // style={styles.TextInput}
                      onValueChange={(itemValue) => setPatientRequestorBy(itemValue)}
                      mode='dropdown'
                    >
                      <Picker.Item label={'select requestor'} value={''} />
                      {
                        reqestorList !== undefined ?
                          reqestorList.map((item, index) => (
                            <Picker.Item label={item.Requestor} value={item.Id} key={index} />
                          )) : null
                      }
                    </Picker>
                  </View>
                </View>
                <View style={styles.TextInput}>
                  <View style={styles.PickerTextInput}>
                    <Picker
                      selectedValue={PatientReferedBy}
                      // style={styles.TextInput}
                      onValueChange={(itemValue) => setPatientReferedBy(itemValue)}
                      mode='dropdown'
                    >
                      <Picker.Item label={'select referer'} value={''} />
                      {
                        referedList !== undefined ?
                          referedList.map((item, index) => (
                            <Picker.Item label={item.Name} value={item.Id} key={index} />
                          )) : null
                      }
                    </Picker>
                  </View>
                </View>

                <Input
                  value={PatientNationalId}
                  placeholder='National id'
                  onChangeText={(e) => setPatientNationalId(e)}
                  keyboardType='number-pad'
                  onFocus={() => handleError(null, 'PatientNationalId')}
                  label="Natiional Id"
                  errorMessage={errors.PatientNationalId}
                  inputContainerStyle={styles.PickerTextInput}
                />

                <Input
                  value={Remarks}
                  placeholder='remarks'
                  onChangeText={(e) => setRemarks(e)}
                  onFocus={() => handleError(null, 'Remarks')}
                  label="remarks"
                  errorMessage={errors.Remarks}
                />
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.TextInput}
                >
                  <View style={styles.inputField}>
                    <Text>{date === '' ? 'date..' : date.toLocaleDateString()}, {time === '' ? 'time..' : time.toLocaleTimeString()}</Text>
                    <Icon
                      name='calendar'
                      color={'#FF7F00'}
                      type='entypo'
                      style={styles.icon}
                    ></Icon>
                  </View>
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

                {/* <Button disabled={butDis} title='Submit' onPress={hndleSubmit}></Button> */}



                {/* <Button title="Register" onPress={validate} /> */}
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
                  {/* {console.log(region)} */}
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
                  <Button title='cancle' onPress={() => setIsVisible(false)} color={'#ffc107'} buttonStyle={{ backgroundColor: 'yellow' }} />
                  <View>
                    <Text>latitude:{JSON.stringify(region.latitude)}</Text>
                    <Text>longitude:{JSON.stringify(region.longitude)}</Text>
                  </View>
                  <Button title='save' onPress={() => handleAddress(region.latitude, region.longitude)} />
                </View>

              </View>

            </BottomSheet>
            {
              isLoading &&
              <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
                style={styles.centeredView}>
                <View style={styles.centeredView}>

                  <ActivityIndicator size="large" color={global.secondary} />
                </View>
              </Modal>
            }



          </View>
          <View style={styles.TextInput}>
            <AppButton
              title='Submit'
              onPress={hndleSubmit}
              disabled={butDis}
            ></AppButton>
          </View>
        </View>
      </ImageBackground>

    </SafeAreaView>
  )
}

export default AddPatietHomeScreen

const styles = StyleSheet.create({
  maincontainer: {
    // backgroundColor: '#fefefe',
    flexDirection: 'column',
    // justifyContent: 'center',
    flex: 1,
  },
  bkgImg: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').height * 1,

    // flex: 1
  },
  container: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    // height: Dimensions.get('window').height * 0.7,
    flex: 1,
    backgroundColor: '#fefefe',
    marginTop: 100,
    paddingTop: 50,
    paddingBottom: 20,
    // paddingHorizontal: 10,
    borderTopLeftRadius: 50,
  },
  title: {
    fontSize: 24,
    textTransform: 'capitalize',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    color: "#205072",
  },
  TextInput: {
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#4c4747',
    // backgroundColor: '#fefefe',
    width: Dimensions.get('window').width * 1,

  },
  inputField: {
    width: Dimensions.get('window').width - 20,
    // borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fefefe',
    borderBottomColor: '#95957abd',
    // paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  PickerTextInput: {
    width: Dimensions.get('window').width - 20,
    borderWidth: 1,
    borderColor: '#fefefe',
    borderBottomColor: '#95957abd',
    // paddingHorizontal: 10,
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