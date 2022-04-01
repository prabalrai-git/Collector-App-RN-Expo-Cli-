import { Dimensions, FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import PatientCard from '../../components/ui/PatientCard'
import { useDispatch } from 'react-redux'
import { GetPatientList } from '../../Services/appServices/AssignPatient'
import Filter from '../../components/ui/Filter'
import { useIsFocused } from '@react-navigation/native'
import HamMenu from '../../components/ui/HamMenu'
import BackBtn from '../../components/ui/BackBtn'

const BookTestHomeScreen = () => {
  const [PatietList, setPatietList] = useState();
  const [NewData, setNewData] = useState([])
  const isFocused = useIsFocused();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFocused) {
      dispatch(GetPatientList((res) => {
        setPatietList(res.requestorcollectionList);
        setNewData(res.requestorcollectionList)
      }))
    }
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <PatientCard data={item} />
  )

  const handleChange = (val) => {
    if (val === undefined || val === '') {
      setNewData(PatietList)
    } else {
      setNewData(val)
    }
    // console.log("redyrned", newData);
  }

  return (
    <View style={styles.mainContainer}>

      <ImageBackground
        source={require('../../assets/images/bkg8.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      >
        <HamMenu></HamMenu>
        <BackBtn></BackBtn>
        <View style={styles.container}>
          <Filter data={PatietList} returnData={handleChange} bookTestFilter></Filter>
          <FlatList
            data={NewData}
            renderItem={renderItem}
            keyExtractor={item => item.CId}
          />
        </View>

      </ImageBackground>
    </View>
  )
}

export default BookTestHomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  bkgImg: {
    paddingTop: 40,
    width: Dimensions.get('window').width * 1,
    // height: Dimensions.get('window').height * 1,
    flex: 1,
  },
  container: {
    marginTop: 40,
  }
})