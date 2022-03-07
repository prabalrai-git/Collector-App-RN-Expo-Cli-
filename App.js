import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DraweNavigator from './navigation/DraweNavigator';
import * as Location from "expo-location"
import MainStackNavigator from './navigation/MainStackNavigator';


export default function App() {
  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <DraweNavigator/> */}
        <MainStackNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
