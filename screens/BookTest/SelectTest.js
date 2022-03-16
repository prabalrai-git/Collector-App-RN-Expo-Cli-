import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/ui/AppButton';
import SelectTestCard from '../../components/ui/SelectTestCard';
import Filter from '../../components/ui/Filter';

const windowHeight = Dimensions.get('window').height * 0.95;

const data = [
  {
    "id": 1,
    "title": 'Complete Blood Count',
    "price": 850,
  },
  {
    "id": 2,
    "title": 'Hemogran',
    "price": 450,
  },
  {
    "id": 3,
    "title": 'Renal Functionn Text',
    "price": 750,
  },
  {
    "id": 4,
    "title": 'Liver function Test',
    "price": 1050,
  },
  {
    "id": 5,
    "title": 'Complete Blood Count',
    "price": 850,
  },
  {
    "id": 6,
    "title": 'Collagen Disease / Arthrities Panel',
    "price": 850,
  },
  {
    "id": 7,
    "title": 'Anaemia Pael',
    "price": 850,
  },
  {
    "id": 8,
    "title": 'Fertility Profile Female',
    "price": 850,
  },
  {
    "id": 9,
    "title": 'Complete Blood Count 2',
    "price": 850,
  },
];


const SelectTest = ({ route }) => {
  // console.log(route.params.data);
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();
  const [newData, setNewData] = useState(data);

  const renderItem = ({ item }) => (
    <SelectTestCard data={item}
      retData={retData} arrData={selected}
    />
  );


  const retData = (e) => {
    let arr = selected;
    let sum;
    if (arr.includes(e)) {
      // for removing speciic data
      const index = arr.indexOf(e);
      if (index > -1) {
        arr.splice(index, 1); // 2nd parameter means remove one item only
        setTotal(prev => {
          return (prev >= 0 ?
            prev - e.price : 0)
        })
      }
      // arr = [2, 9]
      // console.log(arr);
    } else {
      arr.push(e);
      setTotal(prev => (
        prev + e.price
      ))

    }
    setSelected(arr);
    // console.log('selected', selected);
  }

  const fialDataFun = () => {
    navigation.navigate('AddInfoScreen', { {
      CId: data,
      params: selected 
    }})
  }

  const handleChange = (val) => {
    console.log(val);
    if (val === undefined || val === '') {
      setNewData(data)
    } else {
      setNewData(val)
    }
  }


  return (
    <View style={styles.mainCotnainer}>
      <Filter data={data} returnData={handleChange}></Filter>
      <View style={styles.midContainer}>
        <FlatList
          style={styles.container}
          data={newData}
          keyExtractor={(item) => item.id}
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

        <AppButton title='Proceed' onPress={() => fialDataFun()}></AppButton>
      </View>


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
    letterSpacing:1
  }
})