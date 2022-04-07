
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCollectorRequestByCollectorWiseForWeek, GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'
import { useIsFocused } from '@react-navigation/native'
import AcceptedCard from '../../components/ui/AcceptedCard'




const AcceptedTask = () => {
  const [PatietList, setPatietList] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [disComplete, setdisComplete] = useState(false);
  const [SortedData, setSortedData] = useState();
  const isFocused = useIsFocused();
  const dispatch = useDispatch()
  const user = useSelector(state => state.storeUserData);

  useEffect(() => {
    handleClick()
  }, [isFocused])


  useEffect(() => {
    sortData()
    setdisComplete(false)
  }, [disComplete])

const refData =(res) =>{
  if(res === true){
    handleClick()
  }
}

  const renderItem = ({ item }) => (
    <AcceptedCard data={item} refData={refData}/>
  )
  

  const handleClick = () => {
    // const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    // const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    // const collectorId = 3
    // const data = {
    //   'fromDate': fromDate,
    //   'toDate': toDate,
    //   'collectorId': collectorId

    // }
    // console.log(data);
    dispatch(GetCollectorRequestByCollectorWiseForWeek(user.userData.usrUserId, (res) => {
      if (res?.WeekWiseSampleDetailsByCollectorId.length > 0) {
        setPatietList(res.WeekWiseSampleDetailsByCollectorId)
        setdisComplete(true)
      } else {
        console.log('no data found');
      }
    }))

    
  }

  const sortData = () => {
    let tempArr = []
    if (PatietList !== undefined) {
      PatietList.map(e => {
        if (e.SampleStatus !== null) {
          e.SampleStatus.includes('Accepted') || e.SampleStatus.includes('Collected') ?
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
      <FlatList
        data={SortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.RId}`}
      />
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
  }
})