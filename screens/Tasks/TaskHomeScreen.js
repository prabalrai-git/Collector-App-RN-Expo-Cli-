import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-elements'
import TaskCard from '../../components/ui/TaskCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'
import HamMenu from '../../components/ui/HamMenu'
import BackBtn from '../../components/ui/BackBtn'


const renderItem = ({ item }) => (
  <TaskCard data={item} />
)

const TaskHomeScreen = () => {
  const [PatietList, setPatietList] = useState();

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(GetPatientList((res) => {
      setPatietList(res.requestorcollectionList);
    }))
  }, [])

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../../assets/images/bkg1.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      >
        <HamMenu></HamMenu>
        <BackBtn></BackBtn>
        <FlatList
          data={PatietList}
          renderItem={renderItem}
          keyExtractor={item => item.CId}
        />
      </ImageBackground>
    </View>
  )
}

export default TaskHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    flexDirection: 'column',
    flex: 1
  },
  bkgImg: {
    width: Dimensions.get('window').width * 1,
    flex: 1,
    paddingTop: 90,
  },
})