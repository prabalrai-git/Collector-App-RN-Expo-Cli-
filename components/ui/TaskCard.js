import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from './AppButton';
import { Button } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width * 0.95;


const TaskCard = ({ data }) => {
  // console.log('data', data);
  const [isVisibe, setisVisibe] = useState(false);

  const hadleEvent = () => {
    setisVisibe(true)
    console.log("potato");
    // navigatoin.navigate('TaskInfoScreen', {
    //   data: data
    // })
  }

  const navigatoin = useNavigation()
  return (
    <>
      <TouchableOpacity onPress={() => hadleEvent()}>
        <View style={styles.cardBody}>
          <Text style={styles.ctitle}>{data.PatientFName} {data.PatientLName}</Text>
          <Text style={styles.remarks}>{data.Remarks}</Text>
          <Text style={styles.cDate}>{data.CollectionReqDate}</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisibe}
        style={styles.centeredView}
        onRequestClose={() => {
          setisVisibe(!isVisibe)
        }}
      >

        <View style={styles.centeredView}>

          <View style={styles.container}>
            <Button title='Cancle' color={'#e0c945'}></Button>
            <AppButton title='Accept' onPress={() => navigation.navigate('MapScreen',
              {
                data: route.params.data
              }
            )}></AppButton>
          </View>
        </View>
      </Modal>
    </>
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
    color: "#253539",
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