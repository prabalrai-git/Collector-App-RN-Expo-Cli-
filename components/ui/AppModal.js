import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import AppButton from './AppButton';

const AppModal = ({ data, tSum}) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Test list</Text>
          {
            data.map(e => (
              <View key={e.id} style={styles.moduleList}>
                <Text>{e.title}</Text>
                <Text>{e.price}</Text>
              </View>
            ))
          }
          <View style={styles.moduleList}>
            <Text>Total</Text>
            <Text>{tSum}</Text>
          </View>

          <View style={styles.moduleList}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
            <AppButton title='Save' onPress={() => setModalVisible(!modalVisible)}></AppButton>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default AppModal

const styles = StyleSheet.create({})


  
{/* <BottomSheet modalProps={{}} isVisible={isVisible}>
<View style={styles.ButtonSheetContainer}>
  <View style={styles.preview}>
    {signature ? (
      <Image
        resizeMode={"contain"}
        style={{ width: 335, height: 114 }}
        source={{ uri: signature }}
      />
    ) : null}
  </View>
  <Signature
    onOK={handleSubmit}
    onEmpty={handleEmpty}
    descriptionText="Sign"
    clearText="Clear"
    confirmText="Save"
    webStyle={style}
    style={styles.previewText}
  />
  <View
    style={styles.bSheet}
  >
    <Button title='cancle' onPress={() => setIsVisible(false)} color={'#ffc107'} buttonStyle={{ backgroundColor: 'yellow' }} />
  </View>

</View>

</BottomSheet> */}
