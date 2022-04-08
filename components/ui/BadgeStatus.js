import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BadgeStatus = ({RequestStatus}) => {
  return (
    <View>
      {
        (RequestStatus === 'Requested' || RequestStatus === 'Asigned') ?
          <Text style={[styles.badge]}>pending</Text> : null
      }
      {
        (RequestStatus === 'Collected') ?
          <View>
            <Text style={[styles.badge]}>Not Dropped</Text>
          <Text style={[styles.badge, { backgroundColor: '#19e0ee' }] }>{RequestStatus}</Text>
          </View> : null
      }
      {
        (RequestStatus === 'Accepted') ?
          <View>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge, { backgroundColor: '#a3ee19' }]}>{RequestStatus}</Text>
          </View>
          : null
      }
      {
        (RequestStatus === 'Rejected') ?
          <Text style={[styles.badge, { backgroundColor: '#e43333' }]}>{RequestStatus}</Text> : null
      }
      {
        (RequestStatus === 'Lab Received') ?
          <Text style={[styles.badge, { backgroundColor: '#33cfe4' }]}>{RequestStatus}</Text> : null
      }
      {
        (RequestStatus === 'Report Dispatched') ?
          <Text style={[styles.badge, { backgroundColor: '#1db0dd' }]}>{RequestStatus}</Text> : null
      }

    </View>
  )
}

export default BadgeStatus

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#faf06a',
    color: '#fefefe',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 10,
    marginVertical: 2,
  },
})