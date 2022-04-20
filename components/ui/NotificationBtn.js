import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Icon } from 'react-native-elements'


const newData = [
  {
    'Id': 1,
    'title': 'Notification 1',
    'dis': 'something something something something something something',
    'from': 'user name',

  },
  {
    'Id': 2,
    'title': 'Notification 3',
    'dis': 'something something something something something something',
    'from': 'user name'
  },
]


const windowWidth = Dimensions.get('window').width;
const NotificationBtn = () => {
  const [modalVisible, setModalVisible] = useState()


  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Icon
        name='test-tube-alt'
        color={'#9DD4E9'}
        type='fontisto'
        size={20}
        backgroundColor={'#ffffff'}
        style={
          {
            borderRadius: 12,
            padding: 10
          }
        }
      ></Icon>
      <View style={styles.cardDetail}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDis}>{item.dis}</Text>
      </View>

    </View>
  )


  return (
    <View style={styles.top}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Icon
          name='bells'
          color={'#9DD4E9'}
          type='antdesign'
          size={20}
          backgroundColor={'#ffffff'}
          style={
            {
              borderRadius: 12,
              padding: 10
            }
          }
        ></Icon>
      </TouchableOpacity>
      <Image
        source={require('../../assets/images/user.png')}
        style={{
          borderRadius: 10,
          width: 40,
          height: 40,
        }}
      />

      <Modal
        animationType="slide"
        animationIn="slideInLeft"
        animationOut="slideOutRight"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Notification</Text>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Icon
                  name={'close'}
                  color={'#fefefe'}
                  type='antdesign'
                  size={20}
                  backgroundColor={'#9DD4E9'}
                  style={
                    {
                      borderRadius: 12,
                      padding: 10
                    }
                  }
                ></Icon>
              </TouchableOpacity>

            </View>

            <FlatList
              // style={styles.container}
              data={newData}
              keyExtractor={(item, index) => `${item.Id}${index}`}
              renderItem={renderItem}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NotificationBtn

const styles = StyleSheet.create({
  top: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth - 40,
    alignItems: 'center'
  },
  centeredView: {
    width: '100%',
    flex: 1,
    backgroundColor: '#f9f9f9',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#205072'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "#aae5f7ac",
    paddingVertical: 15,
    paddingHorizontal: 10,
    // alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardDetail: {
    width: windowWidth * 0.8,
  },
  cardTitle: {
    color: '#fefefe',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'capitalize'
  },
  cardDis: {
    color: '#205072',
    letterSpacing: 1,
    fontSize: 14
  }
})