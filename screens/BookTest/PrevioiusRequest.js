import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCollectionRequestHistory} from '../../Services/appServices/AssignPatient'
import { useIsFocused } from '@react-navigation/native'
import TaskCard from '../../components/ui/TaskCard'
import Header from '../../components/Header'



const renderItem = ({ item }) => (
  <View>
    <Text>{item.Test}</Text>
  </View>
)

const PrevioiusRequest = ({route}) => {
  // console.log("route", route.params.data.CId);
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


  // useEffect(() => {
  //   sortData()
  //   setdisComplete(false)
  // }, [disComplete])



  const handleClick = () => {
    // const fromDate = `${FromDate.getFullYear() + "-" + (FromDate.getMonth() + 1) + "-" + FromDate.getDate()}`
    // const toDate = `${ToDate.getFullYear() + "-" + (ToDate.getMonth() + 1) + "-" + ToDate.getDate()}`
    // const collectorId = 3
    // const data = {
    //   'fromDate': fromDate,
    //   'toDate': toDate,
    //   'collectorId': collectorId

    // }
    let data = {
      patid : route.params.data.CId,
      collectorId: user.userData.usrUserId
    }
    // console.log("wtf",data);
    // return
    dispatch(GetCollectionRequestHistory(data, (res) => {
      if (res?.PatientWiseCollectionHistory.length > 0) {
        setPatietList(res.PatientWiseCollectionHistory)
        // setdisComplete(true)
      } else {
        console.log('no data found');
      }
    }))

    
  }

  // const sortData = () => {
  //   let tempArr = []
  //   if (PatietList !== undefined) {
  //     PatietList.map(e => {
  //       if (e.SampleStatus !== null) {
  //         e.SampleStatus.includes('Lab Received') ?
  //           tempArr.push(e)
  //           :
  //           ''
  //       }
  //       setSortedData(tempArr);
  //     })
  //   } else {
  //     console.log('no list data found');
  //   }

  // }

  return (
    <View style={styles.mainContainer}>
      <Header></Header>
      <FlatList
        data={PatietList}
        renderItem={renderItem}
        keyExtractor={(item,index) => `${index}${item.RId}`}
      />
    </View>
  )
}

export default PrevioiusRequest

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1
  },
})