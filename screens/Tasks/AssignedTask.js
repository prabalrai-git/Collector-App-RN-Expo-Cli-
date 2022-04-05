import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dummyData } from '../../dumyData'
// import SampleCard from '../Sample/SampleCard'
import { useDispatch } from 'react-redux'
import { GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'
import TaskCard from '../../components/ui/TaskCard'
import { useIsFocused } from '@react-navigation/native'

// array of asigned status and requested status
// for same user id





const AssignedTask = () => {
  const [asignedData, setAsignedData] = useState(dummyData.RequestList);
  // const [asignedData, setAsignedData] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [SortedData, setSortedData] = useState();
  const [PatietList, setPatietList] = useState([]);
  const dispatch = useDispatch();
  const [disComplete, setdisComplete] = useState(false);
  const isFocused = useIsFocused();


  useEffect(() => {
    handleRequestList()
  }, [isFocused])

  useEffect(() => {
    sortData()
    setdisComplete(false)
  }, [disComplete])

  // to refresh page
   
    // useEffect(() => {
    //   handleRequestList()
    // }, [isFocused])
  // end

  
const renderItem = ({ item }) => (
  // <TaskCard data={item} />
  <TaskCard data={item}/>
)





  // console.log("PatietList", PatietList);

  const handleRequestList = () => {
    const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    const collectorId = 3
    const data = {
      'fromDate': fromDate,
      'toDate': toDate,
      'collectorId': collectorId

    }
    dispatch(GetSampleRequestListByCollector(data, (res) => {
      // console.log(res?.RequestList.length);
      if (res?.RequestList.length > 0) {
        // console.log("in");
        // let arr = asignedData;
        // arr.push(...);
        setPatietList(res.RequestList)
        setdisComplete(true)
      } else {
        console.log('no data found');
      }

    }))

  }

  const sortData = () => {
    let tempArr = []
    PatietList.map(e => {
      // console.log(e.RequestStatus);
      if (e.RequestStatus !== null) {
        e.RequestStatus.includes('Requested') || e.RequestStatus.includes('Asigned') ?
          tempArr.push(e)
          :
          ''
      }
      setSortedData(tempArr);
    })
  }


  return (
    <View>
      <FlatList
        // data={PatietList}
        data={SortedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}${item.RId}`}
      />
    </View>
  )
}

export default AssignedTask

const styles = StyleSheet.create({})