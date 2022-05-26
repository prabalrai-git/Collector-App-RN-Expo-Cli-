import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppButton from '../../components/ui/AppButton';
import LodaingComp from '../../components/ui/LodaingComp';
import { useDispatch, useSelector } from 'react-redux';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ReportVerifyScreen = () => {
  const dispatch = useDispatch();
  const [RequestList, setRequestList] = useState();
  const user = useSelector(state => state.storeUserData.userData);
  // console.log(user.UserId);

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [toshow, setToShow] = useState(false);
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disable, setdisable] = useState(false);
  const [isLoading, setisLoading] = useState(false);

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
          <View style={styles.dateFiltercontainer}>
            <TouchableOpacity
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
            }

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
            <AppButton title='Search' onPress={() => handleClick()}></AppButton>
          </View>
        </View>


        <View style={styles.listcontainer}>
          {
            isLoading === false ?
              // <FlatList
              //   data={RequestList}
              //   renderItem={renderItem}
              //   keyExtractor={item => item.RId}
              // ></FlatList>
              null
              :
              <LodaingComp></LodaingComp>
          }

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
    position: 'relative',
    backgroundColor: '#F9F9F9',
  },
  top: {
    backgroundColor: secodaryCardColor,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden'
  },
  dateFiltercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: secodaryCardColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  TextInput: {
    width: windowWidth * 0.3,
    alignItems: 'center',
    backgroundColor: '#fefefe',
    borderRadius: 5,
    justifyContent: 'center'
  },
  inputField: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  listcontainer: {
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight * 0.86,
    flexDirection: 'row',
  },
})