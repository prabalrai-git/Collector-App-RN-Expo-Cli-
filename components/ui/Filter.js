import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements'

const Filter = ({data, returnData, bookTestFilter, selectTestFilter}) => {
  // console.log(data);
  // console.log("data" ,data.Test);
  const [search, setSearch] = useState("");

  const handlSearch = (val) => {
    const pushArr = [];
    {selectTestFilter &&
      data.map(e => {
        (
          e.Test.toLowerCase().includes(val.toLowerCase())
          ?
          pushArr.push(e) : ''
          // console.log('e', e.Test)
        )
      })
    }
    // "CId": 18,
    // "CollectionReqDate": "2022-03-20T13:07:21.643",
    // "CollectorId": 3,
    // "EnterBy": 15,
    // "EntryDate": "2022-03-20T13:07:21.643",
    // "PatientAddress": "sample string 9",
    // "PatientAge": "sample str",
    // "PatientEmailId": "sample string 8",
    // "PatientFName": "sample string 3",
    // "PatientGender": "sample str",
    // "PatientLName": "sample string 5",
    // "PatientMName": "sample string 4",
    // "PatientNationalId": "sample string 12",
    // "PatientReferedBy": 10,
    // "PatientRequestorBy": 11,
    // "Remarks": "sample string 13",
    
    {bookTestFilter &&
      data !== undefined &&
      data.map(e => {
        (
          e.PatientFName.toLowerCase().includes(val.toLowerCase()) ||
          e.PatientLName.toLowerCase().includes(val.toLowerCase()) 
          ?
          pushArr.push(e) : ''
          // console.log('e', e.Test)
        )
      })
      
    }
    // console.log("pushed arrr",pushArr);
    returnData(pushArr)
  };

  useEffect(() => {
    handlSearch(search)
  }, [search])
  
  
  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={e => setSearch(e)}
        value={search}
        platform= 'ios'
        containerStyle={{backgroundColor: '#00e1ff13'}}
        inputContainerStyle={{backgroundColor: '#fefefe'}}
        cancelButtonProps={{
          color: '#fefefe'
        }}
        // showLoading = {true}
      ></SearchBar>
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({})