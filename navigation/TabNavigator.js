import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AcceptedTask from '../screens/Tasks/AcceptedTask';
import AssignedTask from '../screens/Tasks/AssignedTask';
import CompletedTask from '../screens/Tasks/CompletedTask';
import RejectedTask from '../screens/Tasks/RejectedTask';
import HamMenu from '../components/ui/HamMenu';
import BackBtn from '../components/ui/BackBtn';
import Header from '../components/Header';




const TabNavigator = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    // <ImageBackground
    //   source={require('../assets/images/bkg1.png')}
    //   resizeMode="cover"
    //   style={styles.bkgImg}
    // >
    <View style={styles.mainContainer}>


      {/* <HamMenu></HamMenu>
      <BackBtn></BackBtn> */}
      <Header title={'Tasks'}></Header>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarItemStyle: { width: 100 },
          tabBarStyle: { backgroundColor: '#8ED1FC' },
          tabBarActiveTintColor: '#fefefe',
          
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

  mainContainer: {
    width: Dimensions.get('window').width,
    flex: 1,
    // paddingTop: 90,
    backgroundColor: '#8ED1FC'
  },
  
})