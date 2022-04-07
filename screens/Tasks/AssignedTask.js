import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { dummyData } from '../../dumyData'
import { useDispatch, useSelector } from 'react-redux'
import { GetCollectorRequestByCollectorWiseForWeek, GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'
import TaskCard from '../../components/ui/TaskCard'
import { useIsFocused } from '@react-navigation/native'


// Object {
//   "CId": 75,
//   "CollectionReqDate": "2022-04-06T10:59:26",
//   "CollectorId": 3,
//   "EnterBy": 3,
//   "EntryDate": "2022-04-06T10:59:51",
//   "PatientAddress": "{\"latitude\":27.717199721017852,\"longitude\":85.32399991527198}",
//   "PatientAge": "28",
//   "PatientEmailId": "",
//   "PatientFName": "Three",
//   "PatientGender": "male",
//   "PatientLName": "Three",
//   "PatientMName": "",
//   "PatientReferedBy": 1,
//   "PatientRequestorBy": 1,
//   "RequestId": 61,
//   "RequestStatus": 6,
//   "SampleStatus": "Lab Received",
// },


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
  const user = useSelector(state => state.storeUserData);

// console.log("user ", user.userData.usrUserId);
  useEffect(() => {
    handleRequestList()
  }, [isFocused])

  useEffect(() => {
    sortData()
    setdisComplete(false)
  }, [disComplete])


  const renderItem = ({ item }) => (
    <TaskCard data={item} AsignedTask />
  )


  const handleRequestList = () => {
    // const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    // const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    // const collectorId = 3
    // const data = {
    //   'fromDate': fromDate,
    //   'toDate': toDate,
    //   'collectorId': collectorId

    // }
    // dispatch(GetSampleRequestListByCollector(data, (res) => {
    //   // console.log(res?.RequestList.length);
    //   if (res?.RequestList.length > 0) {
    //     // console.log("in");
    //     // let arr = asignedData;
    //     // arr.push(...);
    //     setPatietList(res.RequestList)
    //     setdisComplete(true)
    //   } else {
    //     console.log('no data found');
    //   }

    // }))
    dispatch(GetCollectorRequestByCollectorWiseForWeek(user.userData.usrUserId, (res) => {
      if (res?.WeekWiseSampleDetailsByCollectorId.length > 0) {
        setPatietList(res.WeekWiseSampleDetailsByCollectorId)
        setdisComplete(true)
      } else {
        console.log('no data found sss');
      }

    }))

  }
// console.log(PatietList);
  const sortData = () => {
    let tempArr = []
    PatietList.map(e => {
      // console.log(e.RequestStatus);
      if (e.SampleStatus !== null) {
        e.SampleStatus.includes('Requested') || e.SampleStatus.includes('Asigned') ?
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