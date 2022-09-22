import { NavigationContainer } from "@react-navigation/native";
// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import DraweNavigator from './navigation/DraweNavigator';
// import * as Location from "expo-location"
import MainStackNavigator from "./navigation/MainStackNavigator";
import { Provider } from "react-redux";
import store from "./Services/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          {/* <DraweNavigator/> */}
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
