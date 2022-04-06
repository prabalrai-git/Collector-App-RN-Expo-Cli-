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
          <Text style={[styles.badge]}>{RequestStatus}</Text> : null
      }
      {
        (RequestStatus === 'Accepted') ?
          <View>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge, { backgroundColor: '#aeee19' }]}>{RequestStatus}</Text>
          </View>
          : null
      }
      {
        (RequestStatus === 'Rejected') ?
          <Text style={[styles.badge, { backgroundColor: '#e43333' }]}>{RequestStatus}</Text> : null
      }
      {
        (RequestStatus === 'Lab Received') ?
          <Text style={[styles.badge, { backgroundColor: '#33e4af' }]}>{RequestStatus}</Text> : null
      }
      {
        (RequestStatus === 'Report Dispatched') ?
          <Text style={[styles.badge, { backgroundColor: '#33bbe4' }]}>{RequestStatus}</Text> : null
      }

    </View>
  )
}

export default BadgeStatus

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#f3ff49',
    color: '#fefefe',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 10,
    marginVertical: 2,
  },
})