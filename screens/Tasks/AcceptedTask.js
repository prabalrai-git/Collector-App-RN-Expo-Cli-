
import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-elements'
import TaskCard from '../../components/ui/TaskCard'
import { useDispatch } from 'react-redux'
import { GetPatientList, GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'
import HamMenu from '../../components/ui/HamMenu'
import BackBtn from '../../components/ui/BackBtn'
import SampleCard from '../Sample/SampleCard'
import { useIsFocused } from '@react-navigation/native'
import AcceptedCard from '../../components/ui/AcceptedCard'



const renderItem = ({ item }) => (
  // <TaskCard data={item} />
  // <SampleCard item={item} />
  <AcceptedCard data={item}/>
)

const AcceptedTask = () => {
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disComplete, setdisComplete] = useState(false);
  const [SortedData, setSortedData] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch()

  useEffect(() => {
    handleClick()
  }, [isFocused])


  useEffect(() => {
    sortData()
    setdisComplete(false)
  }, [disComplete])



  const handleClick = () => {
    const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    const collectorId = 3
    const data = {
      'fromDate': fromDate,
      'toDate': toDate,
      'collectorId': collectorId

    }
    // console.log(data);
    dispatch(GetSampleRequestListByCollector(data, (res) => {
      if (res?.RequestList.length > 0) {
        setPatietList(res.RequestList)
        setdisComplete(true)
      } else {
        console.log('no data found');
      }
    }))

    
  }

  const sortData = () => {
    let tempArr = []
    // console.log("PatietList", PatietList.length);
    // return
    if (PatietList !== undefined) {
      PatietList.map(e => {
        // console.log(e.RequestStatus);
        if (e.RequestStatus !== null) {
          e.RequestStatus.includes('Accepted') || e.RequestStatus.includes('Collected') ?
            tempArr.push(e)
            :
            ''
        }
        setSortedData(tempArr);
      })
    } else {
      console.log('no list data found');
    }

  }
  // console.log("SortedData", SortedData);

  return (
    <View style={styles.mainContainer}>
      {/* <ImageBackground
        source={require('../../assets/images/bkg1.png')}
        resizeMode="cover"
        style={styles.bkgImg}
      > */}
      {/* <HamMenu></HamMenu>
        <BackBtn></BackBtn> */}
      <FlatList
        data={SortedData}
        renderItem={renderItem}
        keyExtractor={item => item.RId}
      />
      {/* </ImageBackground> */}
    </View>
  )
}

export default AcceptedTask

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    flexDirection: 'column',
    flex: 1
  },
  // bkgImg: {
  //   width: Dimensions.get('window').width * 1,
  //   flex: 1,
  //   paddingTop: 90,
  // },
})