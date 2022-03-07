import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const TaskInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Text>{route.params.data.title}</Text>
      <Text>{route.params.data.dis}</Text>
      <View style={styles.container}>
        <Button title='Cancle' color={'#e0c945'}></Button>
        <Button title='Accept' onPress={() => navigation.navigate('MapScreen',
          {
            data: route.params.data
          }
        )}></Button>
      </View>
    </View>
  )
}

export default TaskInfoScreen

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  container: {
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between'
  }
})