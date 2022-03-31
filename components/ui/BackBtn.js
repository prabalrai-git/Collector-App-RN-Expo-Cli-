import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

const BackBtn = () => {
  const navigation = useNavigation()
  
  const handleButton = () => {
    navigation.goBack();
  }
  return (
    <TouchableOpacity onPress={() => handleButton()} style={styles.backBtn}>
      <Icon
        name='arrowleft'
        color={'#ffffff'}
        type='antdesign'
        size={30}
      ></Icon>
    </TouchableOpacity>
  )
}

export default BackBtn

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 40,
    left: 10
  },
})