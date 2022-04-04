import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'

const HamMenu = () => {
  const navigation = useNavigation()
  
  const handleButton = () => {
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <TouchableOpacity onPress={() => handleButton()} style={styles.hamMenuBtn}>
      <Icon
        name='menu-unfold'
        color={'#ffffff'}
        type='antdesign'
        size={30}
      ></Icon>
    </TouchableOpacity>
  )
}

export default HamMenu

const styles = StyleSheet.create({
  // hamMenuBtn: {
  //   position: 'absolute',
  //   top: 40,
  //   right: 20
  // },
})