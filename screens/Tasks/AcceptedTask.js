
import { FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { GetSampleRequestListByCollector } from '../../Services/appServices/AssignPatient'
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
    if (PatietList !== undefined) {
      PatietList.map(e => {
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
  }
})