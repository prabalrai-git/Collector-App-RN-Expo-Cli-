import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PatientCard from '../../components/ui/PatientCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'
import Filter from '../../components/ui/Filter'
import { useIsFocused } from '@react-navigation/native'

const BookTestHomeScreen = () => {
  const [PatietList, setPatietList] = useState();
  const [NewData, setNewData] = useState([])
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (isFocused) {
      dispatch(GetPatientList((res) => {
        setPatietList(res.requestorcollectionList);
      }))
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <PatientCard data={item} />
  )

  const handleChange = (val) => {
    if (val === undefined || val === '') {
      setNewData(PatietList)
    } else {
      setNewData(val)
    }
    // console.log("redyrned", newData);
  }

  return (
    <View style={styles.mainContainer}>
      <Filter data={PatietList} returnData={handleChange} bookTestFilter></Filter>
      <FlatList
        data={NewData}
        renderItem={renderItem}
        keyExtractor={item => item.CId}
        
      />
    </View>
  )
}

export default BookTestHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    // paddingTop: 10,
    flex: 1
  }
})