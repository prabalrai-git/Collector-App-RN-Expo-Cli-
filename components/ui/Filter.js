import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements'

const Filter = ({data, returnData}) => {
  // console.log("data" ,data);
  const [search, setSearch] = useState("");

  const handlSearch = (e) => {
    const pushArr = [];
    setSearch(e)
    data.map(e => {
      (
        e.Requestor.toLowerCase().includes(search)
        ?
        pushArr.push(e) : ''
      )
    })
    console.log("pushed arrr",pushArr);
    returnData(pushArr)
  };
  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={e => handlSearch(e)}
        value={search}
      ></SearchBar>
    </View>
  )
}

export default Filter

const styles = StyleSheet.create({})