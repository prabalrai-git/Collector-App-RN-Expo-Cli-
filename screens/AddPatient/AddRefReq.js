import { Button, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header';
import { Icon, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GetReferred, GetRequestor } from '../../Services/appServices/AssignPatient';
import { useDispatch } from 'react-redux';
import Filter from '../../components/ui/Filter';
import { log } from 'react-native-reanimated';

const AddRefReq = ({ route }) => {
  // console.log("route", route.params.data);
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

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());

  const [isVisibeReq, setisVisibeReq] = useState(false);
  const [isVisibeRef, setisVisibeRef] = useState(false);

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
      // console.log(res);
      setRequestorlist(res?.requestorList)
      setRequestorlistNew(res?.requestorList)
    }))
    dispatch(GetReferred((res) => {
      // console.log(res);
      setReferedList(res?.ReferredDoctorList)
      setReferedListNew(res?.ReferredDoctorList)

    }))

  }, [])

  const handleChangeReq = (e) => {
    // console.log('e', e);
    // setRequestorlist(e)
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

  // "Id": 4,
  // "Requestor": "Nidison Medical Hall",

  console.log("reqestorList", referedList);

  // const renderItem = ({ item }) => (

  // )

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
          // onFocus={() => handleError(null, 'Remarks')}
          label="remarks"
        // errorMessage={errors.Remarks}
        />
        {/* butron sheet or some thing for selector */}

        <Text>{PatientRequestorByName}</Text>
        <Button title="press me req" onPress={() => setisVisibeReq(!isVisibeReq)}></Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibeReq}
          onRequestClose={() => {
            setisVisibeReq(!isVisibeReq)
          }}
        >

          <View style={styles.centeredView}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#8ED1FC',
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setisVisibeReq(false)
                // setisRemarksVisible(false)
                // retDis(false);
              }}>
              <Icon
                name={'close'}
                color={'#fefefe'}
                type='antdesign'
                size={20}
              ></Icon>
            </TouchableOpacity>
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
                    }}
                    style={styles.cardBtn}
                  >
                    <Text>{item.Requestor}</Text>
                  </Pressable>
                )}
              ></FlatList>
            </View>
          </View>
        </Modal>


        <Text>{referedListNew}</Text>
        <Button title="press me req" onPress={() => setisVisibeRef(!isVisibeRef)}></Button>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisibeRef}
          onRequestClose={() => {
            setisVisibeRef(!isVisibeRef)
          }}
        >

          <View style={styles.centeredView}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#8ED1FC',
                padding: 10,
                borderRadius: 50,
              }}
              onPress={() => {
                setisVisibeRef(false)
                // setisRemarksVisible(false)
                // retDis(false);
              }}>
              <Icon
                name={'close'}
                color={'#fefefe'}
                type='antdesign'
                size={20}
              ></Icon>
            </TouchableOpacity>
            <View>
              <Filter data={referedList} returnData={handleChangeReq} forReq></Filter>
              {/* <FlatList
                data={referedList}
                keyExtractor={(item, index) => `${item.Id}${index}`}
                renderItem={({ item }) => ( */}
              {
                referedListNew !== undefined ?
                  referedListNew.map(e => (
                    <Text>
                      {e.Id}
                    </Text>

                  )) : null
              }

              {/* )} */}
              {/* ></FlatList> */}
            </View>
          </View>
        </Modal>


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
    backgroundColor: 'green',
    marginVertical: 4,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
  }
})