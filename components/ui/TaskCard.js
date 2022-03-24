import { Button, Dimensions, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AppButton from './AppButton';

const windowWidth = Dimensions.get('window').width


const TaskCard = ({ data }) => {
  console.log('data', data);
  const [isVisibe, setisVisibe] = useState(false);
  const [isRemarksVisible, setisRemarksVisible] = useState(false);
  const [Remarks, setRemarks] = useState('');

  const hadleEvent = () => {
    setisVisibe(true)
    
  }

  const navigation = useNavigation()
  return (
    <>
      <TouchableOpacity onPress={() => hadleEvent()} style={styles.cardCotainer}>
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
        onRequestClose={() => {
          setisVisibe(!isVisibe)
          setisRemarksVisible(false)
        }}
      >
        <View style={styles.centeredView}>
          {
            isRemarksVisible ?
              <View style={styles.TextInput}>
                <Text style={styles.formLabel}>Remarks</Text>
                <TextInput
                  value={Remarks}
                  placeholder='Remarks'
                  onChangeText={(e) => setRemarks(e)}
                  style={styles.inputField}
                // keyboardType='numeric'
                ></TextInput>

                <AppButton title='Send' onPress={() => {
                  setisVisibe(!isVisibe)
                  setisRemarksVisible(false)
                  }}></AppButton>
              </View>

              :
              <View style={styles.module}>
                <Button title='Reject' color={'#e0c945'} onPress={() => setisRemarksVisible(true)}></Button>
                <Text>   </Text>
                <AppButton title='Accept' onPress={() => {
                  setisVisibe(false)
                  navigation.navigate('MapScreen',
                  {
                    data: data
                  }
                )}}></AppButton>
              </View>


          }
        </View>
      </Modal>

    </>
  )
}

export default TaskCard

const styles = StyleSheet.create({
  cardCotainer: {
    width: windowWidth,
    paddingHorizontal: 10,
  },
  cardBody: {
    backgroundColor: "#fefefe",
    marginVertical: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,

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
  },
  centeredView: {
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fefefe'
  },
  module: {
    // width: 200,
    // height: 200,
    flexDirection: 'row'
  }

})