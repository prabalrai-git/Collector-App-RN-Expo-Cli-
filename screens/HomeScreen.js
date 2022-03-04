import { Dimensions, PermissionsAndroid, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GreetingCard from '../components/ui/GreetingCard'
import CardButton from '../components/ui/CardButton'
import { useNavigation } from '@react-navigation/native';

import { Alert, Platform } from 'react-native'


const windowWidth = Dimensions.get('window').width * 0.95;

const navData = [
  {
    id: 1,
    name: 'Collect Sample',
    pathName: 'CollectSample'
  },
  {
    id: 2,
    name: 'Drop Sample',
    pathName: 'DropSample'
  },
  {
    id: 3,
    name: 'Total Sample',
    pathName: 'TotalSample'
  },
  {
    id: 4,
    name: 'Today Task',
    pathName: 'TodayTask'
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
    <View style={styles.mainContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // flexDirection: 'column'
  },
  cardContainer: {
    flexDirection: "row",
    // flexWrap: "wrap",
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth,

  }
})