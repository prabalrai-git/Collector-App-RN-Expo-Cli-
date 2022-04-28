import { Dimensions, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Icon } from 'react-native-elements'
import DateBadge from './DateBadge';
import HamMenu from './HamMenu';
import { useDispatch, useSelector } from 'react-redux';
import { GetNotificationByUserId } from '../../Services/appServices/Notificationservice';


const newData = [
  {
    'Id': 1,
    'title': 'Notification 1',
    'dis': 'something something something something something something',
    'from': 'user name',
    'date': '2022-5-6T6:50'
  },
  {
    'Id': 2,
    'title': 'Notification 3',
    'dis': 'something something something something something something',
    'from': 'user name',
    'date': '2022-5-6T6:50'
  },
]


const windowWidth = Dimensions.get('window').width;
const NotificationBtn = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const user = useSelector(state => state.storeUserData.userData);
  // console.log(" user", user.UserId);
  // GetNotificationByUserId

  const dispatch = useDispatch();
  const [Notification, setNotification] = useState();

  useEffect(()=> {
    dispatch(GetNotificationByUserId(user.UserId, (res) => {
      // console.log(res?.notificationdetails);
      setNotification(res?.notificationdetails)
    }))
  }, [modalVisible])

  // console.log('notification list', Notification);

  // "EntryDate": "2022-04-26T17:28:31.07",
  //   "IsSeen": false,
  //   "NId": 1,
  //   "NotficationPathName": "sample string 7",
  //   "NotificationDesc": "sample string 5",
  //   "Title": "sample string 4",
  //   "UserIdFrom": 3,
  //   "UserIdTo": 1,

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
        <Text style={styles.cardTitle}>{item.Title}</Text>
        <Text style={styles.cardDis}>{item.NotificationDesc}</Text>
        <DateBadge date={item.EntryDate}></DateBadge>
      </View>

    </View>
  )


  return (
    <View style={styles.top}>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
      }}>
        <Icon
          name='bells'
          color={'#9DD4E9'}
          type='antdesign'
          size={20}
          backgroundColor={'#ffffff'}
          style={
            {
              borderRadius: 10,
              padding: 10
            }
          }
        ></Icon>
      </TouchableOpacity>
      {/* <Image
        source={require('../../assets/images/user.png')}
        style={{
          borderRadius: 10,
          width: 40,
          height: 40,
        }}
      /> */}
      <HamMenu></HamMenu>

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
              data={Notification}
              keyExtractor={(item, index) => `${item.NId}${index}`}
              renderItem={renderItem}
              inverted={true}
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
    width: windowWidth - 20,
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
    paddingHorizontal: 15,
    // alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  cardDetail: {
    width: windowWidth * 0.75,
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
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'justify'
  }
})