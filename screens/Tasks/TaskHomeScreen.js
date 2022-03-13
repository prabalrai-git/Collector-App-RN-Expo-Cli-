import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-elements'
import TaskCard from '../../components/ui/TaskCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'


const renderItem = ({ item }) => (
  <TaskCard data={item} />
)

const TaskHomeScreen = () => {
  const [PatietList, setPatietList] = useState();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPatientList((res) => {
      setPatietList(res.requestorcollectionList);
    }))
  }, [])
  
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

export default TaskHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'column'
  },
})