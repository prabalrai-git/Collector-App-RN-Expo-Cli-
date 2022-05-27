import { Dimensions, FlatList, Pressable, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header';
import { Icon, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../../components/ui/AppButton';
import LodaingComp from '../../components/ui/LodaingComp';
import { useDispatch, useSelector } from 'react-redux';
import SelectedItem from '../../components/ui/SelectedItem';
import { GlobalStyles } from '../../GlobalStyle';
import CancleBtn from '../../components/ui/CancleBtn';
import InputDate from '../../components/ui/InputDate';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReportVerifyScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.storeUserData.userData);
  // console.log(user.UserId);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [toshow, setToShow] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());

  const [diagnosticIn, setdiagnosticIn] = useState(false)
  const [diagnosticOut, setdiagnosticOut] = useState(false)
  const [SerchFilter, setSerchFilter] = useState(false)

  const onChangeFromData = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    setToShow(false);
    if (mode == 'date') {
      const currentDate = selectedValue || date;
      setFromDate(currentDate);
    } else {
    }
  };
  const onChangeToData = (event, selectedValue) => {
    setToShow(Platform.OS === 'ios');
    setShow(false);
    if (mode == 'date') {
      const currentDate = selectedValue || date;
      setToDate(currentDate);
    } else {
    }
  };



  const showDatepicker = () => {
    setShow(true);
    setToShow(false);
  };
  const showToDatepicker = () => {
    setToShow(true);
    setShow(false);
  };
  return (
    <View style={styles.mainContainer}>

      <View style={styles.container}>
        <View style={styles.top}>
          <Header title={'Reports'}></Header>
          <View style={styles.InputContainer}>
            {
              SerchFilter !== true ?
                <Pressable
                  onPress={() => setSerchFilter(!SerchFilter)}
                  style={{
                    width: '100%',
                    // backgroundColor: 'red',
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'space-between'
                  }}
                >
                  <Text style={{
                    fontSize: 14,
                    color: primary
                  }}>Search</Text>
                  <Icon
                    name='search1'
                    color={primary}
                    type='antdesign'
                    size={20}
                  ></Icon>
                </Pressable>
                :
                <>
                  <View style={[styles.TxtInputContainer, {
                    marginTop: 20,
                  }]}>
                    <Text style={styles.inputLabelTxt}>From</Text>
                    {/* <TouchableOpacity
                      onPress={showDatepicker}
                      style={styles.TextInput}
                    >
                      <View style={styles.inputField}>
                        <Text>{FromDate === '' ? 'FromDate..' : FromDate.toLocaleDateString()}</Text>
                        <Icon
                          name='calendar'
                          color={secodaryCardColor}
                          type='entypo'
                          size={20}
                        ></Icon>
                      </View>
                    </TouchableOpacity>
                    {show &&
                      <DateTimePicker
                        testID="dateTimePicker"
                        // timeZoneOffsetInMinutes={0}
                        value={FromDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeFromData}
                      // minimumDate={new Date()}
                      />
                    } */}
                    <InputDate></InputDate>
                  </View>

                  <View style={styles.TxtInputContainer}>
                    <Text style={styles.inputLabelTxt}>to</Text>
                    <TouchableOpacity
                      onPress={showToDatepicker}
                      style={styles.TextInput}
                    >
                      <View style={styles.inputField}>
                        <Text>{ToDate === '' ? 'ToDate..' : ToDate.toLocaleDateString()}</Text>
                        <Icon
                          name='calendar'
                          color={secodaryCardColor}
                          type='entypo'
                          size={20}
                        ></Icon>
                      </View>
                    </TouchableOpacity>
                    {toshow &&
                      <DateTimePicker
                        testID="dateTimePicker"
                        // timeZoneOffsetInMinutes={0}
                        value={ToDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeToData}
                        minimumDate={new Date()}
                      />
                    }
                  </View>

                  <View style={styles.TxtInputContainer}>
                    <Text style={styles.inputLabelTxt}>Fical year</Text>
                    <TouchableOpacity
                      onPress={showToDatepicker}
                      style={styles.TextInput}
                    >
                      <View style={styles.inputField}>
                        <Text>{ToDate === '' ? 'ToDate..' : ToDate.toLocaleDateString()}</Text>
                        <Icon
                          name='calendar'
                          color={secodaryCardColor}
                          type='entypo'
                          size={20}
                        ></Icon>
                      </View>
                    </TouchableOpacity>
                    {toshow &&
                      <DateTimePicker
                        testID="dateTimePicker"
                        // timeZoneOffsetInMinutes={0}
                        value={ToDate}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChangeToData}
                        minimumDate={new Date()}
                      />
                    }
                  </View>
                  <View style={styles.TxtInputContainer}>
                    <View style={styles.switchContainer}>
                      <Text style={styles.inputLabelTxt}>Diagnostic In</Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={diagnosticIn ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setdiagnosticIn(!diagnosticIn)}
                        value={diagnosticIn}
                      />
                    </View>
                    {
                      diagnosticIn &&
                      <View style={[styles.TxtInputContainer, {
                        borderWidth: 1,
                        borderColor: secodaryCardColor,
                        borderRadius: 10,
                        paddingVertical: 10,
                      }]}>
                        {/* <Text style={styles.inputLabelTxt}>Diagonstic Items</Text> */}
                        <TouchableOpacity
                          onPress={showToDatepicker}
                          style={styles.SelectInput}
                        >
                          <View style={{
                            width: '100%',
                            flexWrap: 'wrap',
                            flexDirection: 'row'
                          }}>
                            {/* <Text>{ToDate === '' ? 'ToDate..' : ToDate.toLocaleDateString()}</Text>
                    <Icon
                      name='calendar'
                      color={secodaryCardColor}
                      type='entypo'
                      size={20}
                    ></Icon> */}
                            <SelectedItem title={'titel one'}></SelectedItem>
                            <SelectedItem title={'titel one one'}></SelectedItem>
                            <SelectedItem title={'titel one two'}></SelectedItem>
                            <SelectedItem title={'titel one threee'}></SelectedItem>
                            <SelectedItem title={'titel one one one one'}></SelectedItem>
                            <SelectedItem title={'titel one potato'}></SelectedItem>
                            <SelectedItem title={'titel one'}></SelectedItem>

                          </View>

                        </TouchableOpacity>
                      </View>
                    }


                  </View>
                  <View style={styles.TxtInputContainer}>
                    <View style={styles.switchContainer}>
                      <Text style={styles.inputLabelTxt}>Diagnostic Out</Text>
                      <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={diagnosticOut ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => setdiagnosticOut(!diagnosticOut)}
                        value={diagnosticOut}
                      />
                    </View>
                    {
                      diagnosticOut &&
                      <View style={[styles.TxtInputContainer, {
                        borderWidth: 1,
                        borderColor: secodaryCardColor,
                        borderRadius: 10,
                        paddingVertical: 10,
                      }]}>
                        {/* <Text style={styles.inputLabelTxt}>Diagonstic Items</Text> */}
                        <TouchableOpacity
                          onPress={showToDatepicker}
                          style={styles.SelectInput}
                        >
                          <View style={{
                            width: '100%',
                            flexWrap: 'wrap',
                            flexDirection: 'row'
                          }}>
                            <SelectedItem title={'titel one'}></SelectedItem>
                            <SelectedItem title={'titel one one'}></SelectedItem>
                            <SelectedItem title={'titel one two'}></SelectedItem>
                            <SelectedItem title={'titel one threee'}></SelectedItem>
                            <SelectedItem title={'titel one one one one'}></SelectedItem>
                            <SelectedItem title={'titel one potato'}></SelectedItem>
                            <SelectedItem title={'titel one'}></SelectedItem>

                          </View>

                        </TouchableOpacity>
                      </View>
                    }
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    width: windowWidth - 40,
                    marginBottom: 20,
                  }}>
                    <AppButton title={"load"}></AppButton>
                    <Text>     </Text>
                    <CancleBtn title={'cancle'} onPress={() => setSerchFilter(!SerchFilter)}></CancleBtn>
                  </View>


                </>
            }
          </View>
        </View>

        <View style={styles.listcontainer}>
          {/* {
            isLoading === false ?
              <FlatList
                data={RequestList}
                renderItem={renderItem}
                keyExtractor={item => item.RId}
              ></FlatList>
              :
              <LodaingComp></LodaingComp>
          } */}


        </View>

      </View>

    </View >
  )
}

export default ReportVerifyScreen

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
  },
  top: {
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  dateFiltercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: secodaryCardColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TxtInputContainer: {
    marginBottom: 10,
  },
  TextInput: {
    width: windowWidth - 40,
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 5,
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: secodaryCardColor
  },
  inputLabelTxt: {
    color: primary,
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  inputField: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  InputContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth - 20,
    marginLeft: 10,
    marginTop: 10,
    // paddingVertical: 20,
    // paddingTop: 40,
    // paddingBottom: 20,
    borderRadius: 18,
    flexDirection: 'column',
    backgroundColor: '#fefefefe',
    overflow: 'hidden'
  },
  txtInput: {
    width: windowWidth - 20,
    backgroundColor: 'red'
  },
  switchContainer: {
    width: windowWidth - 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  SelectInput: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    width: windowWidth - 40,
  },
  listcontainer: {
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight * 0.86,
    flexDirection: 'row',
    backgroundColor: '#1a7086'
  },
})