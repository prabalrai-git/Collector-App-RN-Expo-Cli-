import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { CollectSampleNavigator, MainStackNavigator } from './StackNavigator'

const DraweNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name='Home'
        component={MainStackNavigator}
      />
      <Drawer.Screen
        name='CollectSample'
        component={CollectSampleNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  )
}

export default DraweNavigator

const styles = StyleSheet.create({})