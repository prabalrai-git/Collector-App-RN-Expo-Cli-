import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
//   CId: 1
  // CollectionReqDate: "2022-03-07T12:10:57.52"
  // CollectorId: 2
  // EnterBy: 15
  // EntryDate: "2022-03-07T12:10:57.52"
  // PatientAddress: "sample string 9"
  // PatientAge: "sample str"
  // PatientEmailId: "sample string 8"
  // PatientFName: "sample string 3"
  // PatientGender: "sample str"
  // PatientLName: "sample string 5"
  // PatientMName: "sample string 4"
  // PatientNationalId: "sample string 12"
  // PatientReferedBy: 10
  // PatientRequestorBy: 11
  // Remarks: "sample string 13"

const TaskInfoScreen = ({ route }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <Text>{route.params.data.PatientFName} {route.params.data.PatientMName} {route.params.data.PatientLName}</Text>
      <Text>{route.params.data.Remarks}</Text>
      <View style={styles.container}>
        <Button title='Cancle' color={'#e0c945'}></Button>
        <Button title='Accept' onPress={() => navigation.navigate('MapScreen',
          {
            data: route.params.data
          }
        )}></Button>
      </View>
    </View>
  )
}

export default TaskInfoScreen

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center'
  },

  container: {
    flexDirection: 'row',
    padding: 30,
    justifyContent: 'space-between'
  }
})