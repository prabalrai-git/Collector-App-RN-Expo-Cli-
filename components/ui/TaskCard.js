import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width * 0.95;

const TaskCard = ({ data }) => {
  console.log('data', data);
  
  const navigatoin = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigatoin.navigate('TaskInfoScreen', {
      data: data
    })}>
      <View style={styles.cardBody}>
        <Text style={styles.ctitle}>{data.PatientFName} {data.PatientLName}</Text>
        <Text style={styles.remarks}>{data.Remarks}</Text>
        <Text style={styles.cDate}>{data.CollectionReqDate}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default TaskCard

const styles = StyleSheet.create({
  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: windowWidth,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#205072',
    shadowColor: "#101010",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  ctitle: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#205072",
    marginBottom: 5,
  },
  remarks: {
    color: "#25353",
    fontSize: 14,
    letterSpacing: 2,
    marginBottom: 5,
  },
  cDate: {
    color: "#fefefe",
    fontSize: 10,
    letterSpacing: 2,
    paddingHorizontal: 7,
    paddingVertical: 3,
    backgroundColor: "#ff7f00",
    borderRadius: 10,
    width: 'auto'
  }

})