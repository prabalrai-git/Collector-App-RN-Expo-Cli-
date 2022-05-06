import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'

const SeenBadge = () => {
  return (
    <View style={styles.seenConatiner}>
      <Icon
        name='checkcircleo'
        color={'#5bc493'}
        type='antdesign'
        size={14}
      ></Icon>
      <Text style={{
        color: "#5bc493",
        marginLeft: 5,
      }}>seen</Text>
    </View>
  )
}

export default SeenBadge

const styles = StyleSheet.create({
  seenConatiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:"baseline"
  }
})