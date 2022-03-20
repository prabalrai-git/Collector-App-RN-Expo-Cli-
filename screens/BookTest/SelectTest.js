import { Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/ui/AppButton';
import SelectTestCard from '../../components/ui/SelectTestCard';
import Filter from '../../components/ui/Filter';
import { useDispatch } from 'react-redux';
import { GetTestList } from '../../Services/appServices/AssignPatient';

const windowHeight = Dimensions.get('window').height * 0.95;
const windowWidth = Dimensions.get('window').width * 0.55;
// const data = [
//   {
//     "Id": 1,
//     "TestType": "Executive",
//     "Test": "EXECUTIVE HEALTH CHECK UP CATEGORY A",
//     "Price": 7000
// },
// {
//     "Id": 2,
//     "TestType": "Executive",
//     "Test": "EXECUTIVE HEALTH CHECK UP CATEGORY B",
//     "Price": 5500
// },
// {
//     "Id": 3,
//     "TestType": "Executive",
//     "Test": "COMPREHENSIVE DIABETIC CHECK UP (CDC)",
//     "Price": 4200
// },
// {
//     "Id": 4,
//     "TestType": "Executive",
//     "Test": "COMPREHENSIVE EXECUTIVE HEALTH CHECK UP(MALE)",
//     "Price": 18000
// },
// {
//     "Id": 6,
//     "TestType": "Executive",
//     "Test": "COMPREHENSIVE EXECUTIVE HEALTH CHECK UP(FEMALE)",
//     "Price": 18000
// },
// {
//     "Id": 7,
//     "TestType": "Executive",
//     "Test": "BASIC HEALTH- SCREENING PACKAGE",
//     "Price": 2100
// },
// {
//     "Id": 8,
//     "TestType": "Executive",
//     "Test": "INDIAN EMBASSY PACKAGE",
//     "Price": 3200
// },
// {
//     "Id": 9,
//     "TestType": "Executive",
//     "Test": "INHALATION PANEL",
//     "Price": 3650
// },
// {
//     "Id": 10,
//     "TestType": "Executive",
//     "Test": "FOOD PANEL",
//     "Price": 3650
// },
// {
//     "Id": 11,
//     "TestType": "Executive",
//     "Test": "Diabetes Control Package",
//     "Price": 950
// },
// {
//     "Id": 12,
//     "TestType": "Executive",
//     "Test": "Annual Health Check Up",
//     "Price": 0
// },
// {
//     "Id": 13,
//     "TestType": "Executive",
//     "Test": "Senior Citizen Executive Health Package- Male",
//     "Price": 5200
// },
// {
//     "Id": 14,
//     "TestType": "Executive",
//     "Test": "Senior Citizen Executive Health Package- Female",
//     "Price": 5300
// },
// {
//     "Id": 15,
//     "TestType": "Executive",
//     "Test": "Child Health Checkup",
//     "Price": 4000
// },
// {
//     "Id": 16,
//     "TestType": "Executive",
//     "Test": "Platinum Health Check-up",
//     "Price": 10000
// },
// {
//     "Id": 17,
//     "TestType": "Executive",
//     "Test": "Executive Health Check Up Category C",
//     "Price": 4000
// },
// {
//     "Id": 18,
//     "TestType": "Executive",
//     "Test": "Gout Panel",
//     "Price": 2700
// },
// {
//     "Id": 19,
//     "TestType": "Executive",
//     "Test": "Sexual Dysfunction Test male",
//     "Price": 10500
// },
// {
//     "Id": 20,
//     "TestType": "Executive",
//     "Test": "Sexual Dysfunction Test Female",
//     "Price": 11000
// },
// {
//     "Id": 21,
//     "TestType": "Executive",
//     "Test": "Annual Health CheckUp Package(NRL Staff)",
//     "Price": 0
// }
// ]

const SelectTest = ({ route }) => {
  // console.log(route.params.data);
  const [data, setData] = useState([])
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [newData, setNewData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTestList(res => {
      setData(res.testList);
    }))
    // setNewData(data)
  }, [])

  // console.log(data);
  const renderItem = ({ item }) => (

    <SelectTestCard data={item}
      retData={retData} arrData={selected}
    />
  );


  const retData = (e) => {
    let arr = selected;

    if (arr.includes(e)) {
      // for removing speciic data
      const index = arr.indexOf(e);
      if (index > -1) {
        arr.splice(index, 1); // 2nd parameter means remove one item only
        setTotal(prev => {
          return (prev >= 0 ?
            prev - e.Price : 0)
        })
      }
    } else {
      arr.push(e);
      setTotal(prev => (
        prev + e.Price
      ))

    }
    setSelected(arr);
    // console.log('selected', selected);
  }



  const handleChange = (val) => {
    if (val === undefined || val === '') {
      setNewData([])
    } else {
      setNewData(val)
    }
    // console.log("redyrned", newData);
  }

  const handleProceed = () => {
    // const  
    if (selected.length > 0) {
      navigation.navigate('BookTest', {
        screen: 'BilligScreen',
        params: {
          userData: route.params.data,
          tests: {
            total: total,
            testList: selected
          }
        }

      })
    } else {
      Alert.alert('please select test')
    }

    // setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.mainCotnainer}>
      <Filter data={data} returnData={handleChange}></Filter>
      <View style={styles.midContainer}>
        <FlatList
          style={styles.container}
          data={newData}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.btnContainer}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <Text style={styles.tSum}>Total: </Text>
          <Text style={styles.tPrice}>Rs.{total}</Text>
        </View>

        <AppButton title='Proceed'
          onPress={() => handleProceed()}

        ></AppButton>
      </View>
      {
        modalVisible === true ?

          <View style={styles.modalBkg}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text>Test list</Text>
                  {
                    selected.map((e, index) => (
                      <View key={index} style={styles.moduleList}>
                        <Text style={{ width: windowWidth, fontSize: 14 }}>{e.Test}</Text>
                        <Text style={{ color: "#FFC285" }}>{e.Price}</Text>
                      </View>
                    ))
                  }
                  <View style={styles.moduleList}>
                    <Text>Total</Text>
                    <Text style={styles.tPrice}>{total}</Text>
                  </View>

                  <View style={styles.moduleList}>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>cancle</Text>
                    </Pressable>
                    <AppButton title='Save' onPress={() => handleSubmit()}></AppButton>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          : <View></View>
      }

    </View>
  )
}

export default SelectTest

const styles = StyleSheet.create({
  mainCotnainer: {
    // height: windowHeight,
    paddingTop: 40,
    // backgroundColor: '#fefefe'
  },
  midContainer: {
    height: windowHeight * 0.9,
    paddingBottom: 50,
    // paddingTop: 10,
  },
  btnContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#fefefe',
    position: 'absolute',
    bottom: 10,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  tPrice: {
    color: '#FFC285',
    fontSize: 18,
    letterSpacing: 1
  },
  modalBkg: {

    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fefefe',
    opacity: 0.9,
    zIndex: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  moduleList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "100%",

  }
})