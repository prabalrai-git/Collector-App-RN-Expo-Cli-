import { Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View, Button, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/ui/AppButton';
import SelectTestCard from '../../components/ui/SelectTestCard';
import Filter from '../../components/ui/Filter';
import { useDispatch } from 'react-redux';
import { GetTestList } from '../../Services/appServices/AssignPatient';
import HamMenu from '../../components/ui/HamMenu';
import BackBtn from '../../components/ui/BackBtn';
import CancleBtn from '../../components/ui/CancleBtn';
import Header from '../../components/Header';

const windowHeight = Dimensions.get('window').height * 0.95;
const windowWidth = Dimensions.get('window').width * 0.55;


const SelectTest = ({ route }) => {
  console.log("params data", route.params.data);
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

  const renderItem = ({ item }) => (
    <SelectTestCard
      data={item}
      retData={retData}
      arrData={selected}
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
      // Alert.alert(
      //   "Alert",
      //   "removed test",
      //   [
      //     {
      //       text: "OK",
      //       // onPress: () => console.log("OK Pressed") 
      //     }
      //   ]
      // );
    } else {
      arr.push(e);
      setTotal(prev => (
        prev + e.Price
      ))

    }
    setSelected(arr);
  }

  const RemoveItem = (e) => {
    let tempArr = selected;
    if (tempArr.includes(e)) {
      // for removing speciic data
      const index = tempArr.indexOf(e);
      if (index > -1) {
        tempArr.splice(index, 1); // 2nd parameter means remove one item only
        setTotal(prev => {
          return (prev >= 0 ?
            prev - e.Price : 0)
        })
      }
    }
    setSelected(tempArr);
  }


  const handleChange = (val) => {
    if (val === undefined || val === '') {
      setNewData([])
    } else {
      setNewData(val)
    }
  }

  const popBodule = () => {
    if (selected.length > 0) {
      setModalVisible(true)
    } else {
      Alert.alert('please select test')
    }

  }

  const handleProceed = () => {
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
    setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.mainCotnainer}>
      {/* <ImageBackground
        source={require('../../assets/images/bkg8.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      > */}
        {/* <HamMenu></HamMenu>
        <BackBtn></BackBtn> */}
        <Header data={data} returnData={handleChange} selectTestFilter title={'Select Test'}></Header>
        <View style={styles.container}>
          {/* <Filter data={data} returnData={handleChange} selectTestFilter></Filter> */}
          <View style={styles.midContainer}>
            <FlatList
              // style={styles.container}
              data={newData}
              keyExtractor={(item) => `${item.Id}${item.Test}`}
              renderItem={renderItem}
            />
          </View>

        </View>
        <View style={styles.btnContainer}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Text style={styles.tSum}>Total: </Text>
            <Text style={styles.tPrice}>Rs.{total}</Text>
          </View>

          <AppButton title='Cart'
            onPress={() => popBodule()}

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
                    {/* <Text>Test list</Text> */}
                    {
                      selected.map((e, index) => (
                        <View key={index} style={styles.moduleList}>
                          <View>
                            <Text style={{ width: windowWidth, fontSize: 12 }}>{e.Test}</Text>
                            <Text style={{ color: "#FFC285" }}>Rs.{e.Price}</Text>
                          </View>
                          <View>
                            <CancleBtn title='remove' onPress={() => RemoveItem(e)}></CancleBtn>
                          </View>

                        </View>
                      ))
                    }
                    <View style={styles.moduleTest}>
                      <Text style={{color: '#fefefe', fontSize: 16}}>Total</Text>
                      <Text style={styles.tPrice}>{total}</Text>
                    </View>

                    <View style={styles.moduleList}>
                      {/* <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.textStyle}>cancle</Text>
                      </Pressable> */}
                      <CancleBtn title={'cancle'} onPress={() => setModalVisible(!modalVisible)}></CancleBtn>
                      <AppButton title='Proceed' onPress={() => handleProceed()}></AppButton>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            : <View></View>
        }
      {/* </ImageBackground> */}
    </View>
  )
}

export default SelectTest

const styles = StyleSheet.create({
  mainCotnainer: {
    backgroundColor: '#fefefe',
    flex: 1,
    position: 'relative'
  },
  // bkgImg: {
  //   paddingTop: 40,
  //   width: Dimensions.get('window').width * 1,
  //   flex: 1,
  // },
  midContainer: {
    height: windowHeight * 1,
    paddingBottom: 50,
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
    bottom: 0,
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
  container: {
    // marginTop: 40,
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
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 10,
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
    marginBottom: 10,

  },
  moduleTest:{
    // borderWidth: 1,
    // borderColor: 'red',
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 2,
    backgroundColor: '#4688B3'
  }
})