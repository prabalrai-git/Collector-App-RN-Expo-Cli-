import { Alert, Dimensions, FlatList, Modal, Pressable, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/ui/AppButton';
import SelectTestCard from '../../components/ui/SelectTestCard';
import Filter from '../../components/ui/Filter';
import { useDispatch } from 'react-redux';
import { GetTestList } from '../../Services/appServices/AssignPatient';

const windowHeight = Dimensions.get('window').height * 0.95;
const windowWidth = Dimensions.get('window').width * 0.55;


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

  const renderItem = ({ item }) => (
    <SelectTestCard
      data={item}
      retData={retData}
      arrData={selected}
      checked={true}
    />
  );


  const retData = (e) => {
    let arr = selected;

    if (arr.includes(e)) {
      // for removing speciic data
      // const index = arr.indexOf(e);
      // if (index > -1) {
      //   arr.splice(index, 1); // 2nd parameter means remove one item only
      //   setTotal(prev => {
      //     return (prev >= 0 ?
      //       prev - e.Price : 0)
      //   })
      // }
      Alert.alert(
        "Alert",
        "The slecected test is already added",
        [
          {
            text: "OK",
            // onPress: () => console.log("OK Pressed") 
          }
        ]
      );
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
    // setModalVisible(!modalVisible)
  }


  return (
    <View style={styles.mainCotnainer}>
      <Filter data={data} returnData={handleChange} selectTestFilter></Filter>
      <View style={styles.midContainer}>
        <FlatList
          style={styles.container}
          data={newData}
          keyExtractor={(item) => `${item.Id}${item.Test}`}
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
                  <Text>Test list</Text>
                  {
                    selected.map((e, index) => (
                      <View key={index} style={styles.moduleList}>
                        <View className="moduleTest">
                          <Text style={{ width: windowWidth, fontSize: 12 }}>{e.Test}</Text>
                          <Text style={{ color: "#FFC285" }}>Rs.{e.Price}</Text>
                        </View>
                        <View>
                          <Button title='remove' onPress={()=> RemoveItem(e)}></Button>
                        </View>

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
                    <AppButton title='Save' onPress={() => handleProceed()}></AppButton>
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
    // paddingTop: 40,
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