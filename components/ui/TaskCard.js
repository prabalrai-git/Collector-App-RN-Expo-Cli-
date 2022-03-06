import { Dimensions, StyleSheet, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Text } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width * 0.95;

const TaskCard = ({ data }) => {
  return (
    <TouchableOpacity>
      <View style={styles.cardBody}>
        <Text h4>{data.title}</Text>
        <Text>{data.dis}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TaskCard

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 20,
    width: windowWidth,
    borderRadius: 12,
  }
})