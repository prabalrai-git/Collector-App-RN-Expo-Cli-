import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SelectTestCard from './SelectTestCard';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../components/ui/AppButton'

const data = [
  {
    id: 1,
    title: 'Complete Blood Count',
    price: 850,
  },
  {
    id: 2,
    title: 'Hemogran',
    price: 450,
  },
  {
    id: 3,
    title: 'Renal Functionn Text',
    price: 750,
  },
  {
    id: 4,
    title: 'Liver function Test',
    price: 1050,
  },
  {
    id: 5,
    title: 'Complete Blood Count',
    price: 850,
  },
  {
    id: 6,
    title: 'Collagen Disease / Arthrities Panel',
    price: 850,
  },
  // {
  //   id: 7,
  //   title: 'Anaemia Pael',
  //   price: 850,
  // },
  // {
  //   id: 8,
  //   title: 'Fertility Profile Female',
  //   price: 850,
  // },
  // {
  //   id: 9,
  //   title: 'Complete Blood Count 2',
  //   price: 850,
  // },
];



const Index = () => {
  const [selected, setSelected] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

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
  }

  const fialDataFun = () => {
    navigation.navigate('AddInfoScreen', { params: selected })
  }

  return (
    <View style={styles.mainCotnainer}>
      <View style={styles.listContainer}>
        <FlatList
          style={styles.container}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
      <AppButton title='Proceed' onPress={() => fialDataFun()}></AppButton>

    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  mainCotnainer: {
    flex: 1,
  },
  listContainer: {
    
  }
})