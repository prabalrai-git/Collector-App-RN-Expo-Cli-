import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const StatusBadge = (props) => {
  const [bkg, setbkg] = useState();
  const [color, setcolor] = useState();
  const [title, setTitle] = useState();
  useEffect(() => {
    if (props.data === "Requested") {
      setbkg("#d6db1c")
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Collected") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Assigned") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Accepted") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Rejected") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Lab Received") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }
    if (props.data === "Report Dispatched") {
      setbkg("#d6db1c");
      setcolor('#fefefe');
      setTitle(props.data)
    }

  }, [])


  return (
    <View style={[styles.statusContaier, {
      backgroundColor: bkg,
    }]}>
      <Text style={[styles.statusText, {
        color: color,
      }]}>{title}</Text>
    </View>
  )
}

export default StatusBadge

const styles = StyleSheet.create({
  statusContaier: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    margin: 3,
    borderRadius: 10,
    overflow: 'hidden'
  },
  statusText: {
    fontSize: 10
  }
})