import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { Icon, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AssignPatient, GetReferred, GetRequestor } from '../../Services/appServices/AssignPatient';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../../components/ui/Filter';
import { log } from 'react-native-reanimated';
import AppButton from '../../components/ui/AppButton';
import { StackActions, useNavigation } from '@react-navigation/native';

const AddRefReq = ({ route }) => {
  // console.log("route", route.params.data);
  const navigation = useNavigation()
  const [Remarks, setRemarks] = useState('')
  const [PatientReferedBy, setPatientReferedBy] = useState('');
  const [PatientReferedByName, setPatientReferedByName] = useState('');
  const [PatientRequestorBy, setPatientRequestorBy] = useState('');
  const [PatientRequestorByName, setPatientRequestorByName] = useState('');
  const [reqestorList, setRequestorlist] = useState();
  const [reqestorListNew, setRequestorlistNew] = useState();
  const [referedList, setReferedList] = useState();
  const [referedListNew, setReferedListNew] = useState();
  const dispatch = useDispatch();
  const user = useSelector(state => state.storeUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [appBtnSis, setappBtnSis] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const [isVisibeReq, setisVisibeReq] = useState(false);
  const [isVisibeRef, setisVisibeRef] = useState(false);

  const [errors, setErrors] = useState({});

  const [btnDis, setbtnDis] = useState(false);

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

  useEffect(() => {
    dispatch(GetRequestor((res) => {
      setRequestorlist(res?.requestorList)
      setRequestorlistNew(res?.requestorList)
    }))
    dispatch(GetReferred((res) => {
      setReferedList(res?.ReferredDoctorList)
      setReferedListNew(res?.ReferredDoctorList)
    }))

  }, [])
  console.log('red', referedList)

  const handleChangeReq = (e) => {
    if (e === undefined || e === '') {
      setRequestorlistNew(reqestorList)
    } else {
      setRequestorlistNew(e)
    }
  }

  const handleChangeRef = (e) => {
    if (e === undefined || e === '') {
      setReferedListNew(referedList)
    } else {
      setReferedListNew(e)
    }
  }

  const handleSubmit = () => {
    // console.log("route data", route.params.data)
    // console.log("date", `${time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()}T${time.toLocaleTimeString()}`)
    // console.log('req, ref', PatientReferedBy, PatientRequestorBy)
    // console.log('remarks', Remarks)
    setIsLoading(true)
    setappBtnSis(true)

    let today = new Date();
    const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;

    let data = {
      "CId": 0,
      "CollectorId": user.userData.usrUserId,
      "PatientFName": route.params.data.PatientFName,
      "PatientMName": route.params.data.PatientMName !== '' ? route.params.data.PatientMName : '',
      "PatientLName": route.params.data.PatientLName,
      "PatientAge": route.params.data.PatientAge,
      "PatientGender": route.params.data.PatientGender,
      "PatientEmailId": route.params.data.PatientEmailId !== '' ? route.params.data.PatientEmailId : '',
      "PatientAddress": route.params.data.PatientAddress,
      "PatientReferedBy": PatientReferedBy,
      "PatientRequestorBy": PatientRequestorBy,
      "PatientNationalId": 0,
      "Remarks": Remarks !== '' ? Remarks : '',
      "EntryDate": fialEntryDate,
      "EnterBy": user.userData.usrUserId,
      "CollectionReqDate": `${time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()}T${time.toLocaleTimeString()}`,
    }
    console.log('data', data)
    let isValid = validate();

    // return
    if (isValid) {
      dispatch(AssignPatient(data, (res) => {
        if (res?.CreatedId > 0 && res?.SuccessMsg === true) {

          setPatientReferedBy('');
          setPatientRequestorBy('');
          setPatientReferedByName('')
          setPatientRequestorByName('');
          setRemarks('');

          setIsLoading(false);
          Alert.alert(
            "Patient Added Sucessfull",
            "Do you want to add test ?",
            [
              { text: "no", onPress: () => {
                navigation.navigate('Home')
                const popAc = StackActions.pop(2);
                navigation.dispatch(popAc);
              } },
              {
                text: "yes", onPress: () => navigation.navigate('AddPatientSelectTest', {
                  patinetId: res.CreatedId
                })
              }
            ]
          );

        } else {
          setIsLoading(false);
          Alert.alert(
            "Failure",
            "There might be some issue. Please Try again later.",
            [
              { text: "OK" }
            ]
          );
        }
        setappBtnSis(false);
      }))
    }
    else {
      setappBtnSis(false);
      setIsLoading(false);
      Alert.alert(
        "Failure",
        "please fill up the details",
        [
          {
            text: "OK", onPress: () => {

            }
          }
        ]
      );
    }

  }

  const handleError = (error, input) => {
    setErrors(prevState =>
      ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    // Keyboard.dismiss();
    let isOpValid = true
    if (PatientReferedBy === '' || PatientReferedBy === undefined) {
      handleError('please enter First Name', 'Referer')
      isOpValid = false
    }
    if (PatientRequestorBy === '' || PatientRequestorBy === undefined) {
      handleError('please enter Last Name', 'Requestor')
      isOpValid = false
    }
    return isOpValid;
  }



  return (
    <View style={styles.maincontainer}>
      <Header title={'Add Patient, ref req'}></Header>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={showDatepicker}
          style={styles.TextInput}
        >
          <Text style={styles.cLabel}>Date and Time</Text>
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
            minimumDate={new Date()}
          />
        }

        <Input
          value={Remarks}
          placeholder='remarks'
          onChangeText={(e) => setRemarks(e)}
          label="remarks"
        />

        <TouchableOpacity
          onPress={() => {
            handleError(null, 'Requestor')
            setisVisibeReq(!isVisibeReq)
            setbtnDis(true)
          }}
          style={styles.TextInput}
          disabled={btnDis}
        // onFocus={() =>}
        >
          <Text style={styles.cLabel}>Requestor</Text>
          <View style={styles.inputField}>
            <Text>{PatientRequestorByName !== '' || PatientRequestorByName !== undefined ? PatientRequestorByName : ''}</Text>
          </View>
          <Text style={{
            fontSize: 12,
            color: 'red'
          }}>{errors.Requestor}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibeReq}
          onRequestClose={() => {
            setisVisibeReq(!isVisibeReq)
            setbtnDis(false)
          }}
        >

          <View style={styles.centeredView}>
            <View>
              <Filter data={reqestorList} returnData={handleChangeReq} forReq></Filter>
              <FlatList
                data={reqestorListNew}
                keyExtractor={(item, index) => `${item.Id}${index}`}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setPatientRequestorBy(item.Id)
                      setPatientRequestorByName(item.Requestor)
                      setisVisibeReq(false)
                      setbtnDis(false)
                    }}
                    style={styles.cardBtn}
                  >
                    <Text style={styles.cardBtnTxt}>{item.Requestor}</Text>
                  </Pressable>
                )}
              ></FlatList>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            handleError(null, 'Referer')
            setisVisibeRef(!isVisibeRef)
            setbtnDis(true)
          }}
          style={styles.TextInput}
          disabled={btnDis}
        // onFocus={() => }
        >
          <Text style={styles.cLabel}>Referer</Text>
          <View style={styles.inputField}>
            <Text>{PatientReferedByName !== '' || PatientReferedByName !== undefined ? PatientReferedByName : ''}</Text>
          </View>
          <Text style={{
            fontSize: 12,
            color: 'red'
          }}>{errors.Referer}</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibeRef}
          onRequestClose={() => {
            setisVisibeRef(!isVisibeRef)
            setbtnDis(false)
          }}
        >
          <View style={styles.centeredView}>
            <View>
              <Filter data={referedList} returnData={handleChangeRef} forRef></Filter>
              <FlatList
                data={referedListNew}
                keyExtractor={(item, index) => `${item.Id}${index}`}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      setPatientReferedBy(item.Id)
                      setPatientReferedByName(item.Name)
                      setisVisibeRef(false)
                      setbtnDis(false)
                    }}
                    style={styles.cardBtn}
                  >
                    <Text style={styles.cardBtnTxt}>{item.Name}</Text>
                  </Pressable>
                )}
              ></FlatList>
            </View>
          </View>
        </Modal>

        <AppButton
          title='submit'
          onPress={handleSubmit}
          disabled={appBtnSis}
        >
        </AppButton>

        {
          isLoading &&
          <Modal
            animationType="fade"
            transparent={true}
            visible={isLoading}
            style={styles.centeredView}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fefefea0'
            }}>

              <ActivityIndicator size="large" color={'red'} />
            </View>
          </Modal>
        }
      </View>
    </View>
  )
}

export default AddRefReq

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: '#fefefe',
    flexDirection: 'column',
  },
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#fefefe',
    paddingTop: 20,
    paddingBottom: 50,
    // flexDirection: 'row',
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
  cLabel: {
    color: "#86939e",
    fontSize: 16,
    fontWeight: 'bold'
  },
  centeredView: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fefefe'
  },
  cardBtn: {
    backgroundColor: '#7fd3c5',
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    width: Dimensions.get('window').width - 20,
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  cardBtnTxt: {
    color: '#fefefe',
    letterSpacing: 1,
    fontSize: 14,
  }
})