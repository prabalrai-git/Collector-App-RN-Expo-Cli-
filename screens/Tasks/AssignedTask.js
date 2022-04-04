import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dummyData } from '../../dumyData'
import SampleCard from '../Sample/SampleCard'
import { useDispatch } from 'react-redux'
import { GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'

// array of asigned status and requested status
// for same user id


const renderItem = ({ item }) => (
  // <TaskCard data={item} />
  <SampleCard item={item}/>
)




const AssignedTask = () => {
  const [asignedData, setAsignedData] = useState();
  const [FromDate, setFromDate] = useState(new Date());
  const [ToDate, setToDate] = useState(new Date());
  const [ReqPatietList, setReqPatietList] = useState();
  const [PatietList, setPatietList] = useState([]);
  const dispatch = useDispatch()
  
  // useEffect(() => {
  //   setAsignedData(dummyData.RequestList)
  //   handleRequestList();
    
  // }, [])
  // useEffect(()=> {
  //   setPatietList[asignedData,ReqPatietList];
  // }, [asignedData, ReqPatietList])

  // console.log("asigned",asignedData);
  // console.log("ReqPatietList",ReqPatietList);
  // console.log("PatietList", PatietList);


  const handleRequestList = () => {
    const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + 5}`
    const collectorId = 3
    const data = {
      'fromDate': fromDate,
      'toDate': toDate,
      'collectorId': collectorId
  
    }
    dispatch(GetSampleRequestListByCollector(data, (res) => {
      setReqPatietList(res.RequestList)
    }))
  }

  const handleAdignedList = () => {
    
  }

  return (
    <View>
      <FlatList
        data={PatietList}
        renderItem={renderItem}
        keyExtractor={item => item.RId}
      />
    </View>
  )
}

export default AssignedTask

const styles = StyleSheet.create({})