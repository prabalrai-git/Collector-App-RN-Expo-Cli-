import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TestCard from '../../components/ui/TestCard'
import Filter from '../../components/ui/Filter';
import { GetRequestor } from '../../Services/appServices/AssignPatient';
import { useDispatch } from 'react-redux';



const renderItem = ({ item }) => (
  <TestCard data={item} />
)




const CollectSampleHomeScreen = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState();
  const [newList, serNewList] = useState();

  useEffect(() => {
    dispatch(GetRequestor((res) => {
      // console.log(res);
      setData(res?.requestorList)
    }))
  }, [])

  const handleSearch = (val) => {
    serNewList(val)
  }
  return (
    <View>
      <Text>CollectSampleHomeScreen</Text>
      <Filter data={data} returnData={handleSearch} />
      <View style={styles.mainContainer}>
        <FlatList
          data={newList === undefined || newList === '' ? data : newList}
          renderItem={renderItem}
          keyExtractor={item => item.Id}
        />
      </View>
    </View>
  )
}

export default CollectSampleHomeScreen

const styles = StyleSheet.create({})