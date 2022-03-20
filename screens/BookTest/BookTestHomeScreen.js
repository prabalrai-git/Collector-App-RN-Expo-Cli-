import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PatientCard from '../../components/ui/PatientCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'

const BookTestHomeScreen = () => {
  const [PatietList, setPatietList] = useState();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPatientList((res) => {
      setPatietList(res.requestorcollectionList);

    }))
  }, [])

  const renderItem = ({ item }) => (
    <PatientCard data={item} />
  )
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={PatietList}
        renderItem={renderItem}
        keyExtractor={item => item.CId}
      />
    </View>
  )
}

export default BookTestHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 40,
  }
})