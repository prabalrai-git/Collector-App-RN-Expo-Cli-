import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements'
import TaskCard from '../../components/ui/TaskCard'

const tData = [
  {
    id: 1,
    title: "To do task 1",
    dis: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores illo commodi harum, nam ea ducimus iure ab at aliquam!'
  },
  {
    id: 2,
    title: "To do task 2",
    dis: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores illo commodi harum, nam ea ducimus iure ab at aliquam!'
  },
  {
    id: 3,
    title: "To do task 3",
    dis: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores illo commodi harum, nam ea ducimus iure ab at aliquam!'
  },
  {
    id: 4,
    title: "To do task 4",
    dis: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores illo commodi harum, nam ea ducimus iure ab at aliquam!'
  },

]

const renderItem = ({ item }) => (
  <TaskCard data={item} />
)

const TaskHomeScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={tData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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