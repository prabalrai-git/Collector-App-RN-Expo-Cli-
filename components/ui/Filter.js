import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SearchBar } from 'react-native-elements'

const Filter = ({data, returnData}) => {
  // console.log("data" ,data);
  const [search, setSearch] = useState("");

  const handlSearch = (val) => {
    const pushArr = [];
    data.map(e => {
      (
        e.title.toLowerCase().includes(val.toLowerCase())
        ?
        pushArr.push(e) : ''
      )
    })
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
        containerStyle={{backgroundColor: '#FF7F00'}}
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