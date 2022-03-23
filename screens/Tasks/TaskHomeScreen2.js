import { Dimensions, FlatList, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-elements'
import TaskCard from '../../components/ui/TaskCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'
import WebView from 'react-native-webview'
// import MapboxGL from '@react-native-mapbox-gl/maps'
// MapboxGL.setAccessToken("pk.eyJ1IjoiOThtYXJlIiwiYSI6ImNsMDBrcnNwbTBhNHUzY3J5eGN6MGgwZm8ifQ.IQosi4_gB8CXD9q31fl7RQ");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TaskHomeScreen = () => {


  return (
    <View style={styles.mainContainer}>
      <WebView
        scalesPageToFit={true}
        bounces={false}
        javaScriptEnabled
        style={{ height: windowHeight, width: windowWidth }}
        source={{
          html: `
            <!DOCTYPE html>
            <html>
              <head></head>
              <body>
                <div id="baseDiv">
                <iframe src="https://maps.google.com/maps?q=${27.6930196123123}, ${85.3217164123123}&z=15&output=embed" width="100%" height="570" frameborder="0" style="border:0"></iframe>
                </div>
              </body>
            </html>   
            `,
        }}
        automaticallyAdjustContentInsets={false}
      />
    </View>
  )
}

export default TaskHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // // marginTop: 10,
    // flexDirection: 'column'
    width: windowWidth,
    height: windowHeight,
  },
})