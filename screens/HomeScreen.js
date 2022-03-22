import { Dimensions, PermissionsAndroid, FlatList, StyleSheet, Text, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import GreetingCard from '../components/ui/GreetingCard'
import CardButton from '../components/ui/CardButton'
import { useNavigation } from '@react-navigation/native';

import { Alert, Platform } from 'react-native'


const windowWidth = Dimensions.get('window').width * 0.95;

const navData = [
  {
    id: 1,
    name: 'Add Patient',
    pathName: 'AddPatient',
    // img: '../../assets/images/doctor.png',
    // img: require('../../assets/images/doct`or.png'),
    color: '#9985FF'
  },
  {
    id: 2,
    name: 'Book Test',
    pathName: 'BookTest',
    // img: '../../assets/images/collectSample.png',
    // img: require('../../assets/images/collectSample.png'),
    color: '#FF8585'
  },
  {
    id: 3,
    name: 'Sample',
    pathName: 'SampleHome',
    // img: '../../assets/images/BookLabTest.png',
    // img: require('../../assets/images/BookLabTest.png'),
    color: '#FFC285'
  },
  {
    id: 4,
    name: 'Asigned Task',
    pathName: 'task',
    // img: '../../assets/images/task.png',
    // img: require('../../assets/images/task.png'),
    color: '#4688B3'
  },
]


const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, seterrorMsg] = useState(null);
  const navigation = useNavigation();


  const renderItem = ({ item }) => (
    <CardButton data={item} />
  )
  return (
    <View
      // source={require('../assets/images/cat.png')}
      style={styles.mainContainer}
    >
      <GreetingCard />
      <View style={styles.cardContainer} >
        <FlatList
          data={navData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    // flexDirection: 'column'
    paddingVertical: 10,
    backgroundColor: '#ffffff',

  },
  cardContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,

  }
})