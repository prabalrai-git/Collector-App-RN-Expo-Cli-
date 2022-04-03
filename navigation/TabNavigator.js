import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AcceptedTask from '../screens/Tasks/AcceptedTask';
import AssignedTask from '../screens/Tasks/AssignedTask';
import CompletedTask from '../screens/Tasks/CompletedTask';
import RejectedTask from '../screens/Tasks/RejectedTask';
import HamMenu from '../components/ui/HamMenu';
import BackBtn from '../components/ui/BackBtn';




const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    // <ImageBackground
    //   source={require('../assets/images/bkg1.png')}
    //   resizeMode="cover"
    //   style={styles.bkgImg}
    // >
    <View style={styles.bkgImg}>


      <HamMenu></HamMenu>
      <BackBtn></BackBtn>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: '#b1ddf6' },

        }}
      >
        <Tab.Screen name="AssignedTask" component={AssignedTask} options={{ title: 'Asigned Task' }} />
        <Tab.Screen name="AcceptedTask" component={AcceptedTask} options={{ title: 'Accepted Task' }} />
        <Tab.Screen name="CompletedTask" component={CompletedTask} options={{ title: 'Completed Task' }} />
        <Tab.Screen name="RejectedTask" component={RejectedTask} options={{ title: 'Rejected Task' }} />
      </Tab.Navigator>
    </View>
    // </ImageBackground>

  )
}

export default TabNavigator

const styles = StyleSheet.create({

  bkgImg: {
    width: Dimensions.get('window').width * 1,
    flex: 1,
    paddingTop: 90,
    backgroundColor: '#b1ddf6'
  },
  
})