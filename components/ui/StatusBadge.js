import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const StatusBadge = ({ RequestStatus }) => {

  return (
    <>
      {
        (RequestStatus === 'Requested' || RequestStatus === 'Asigned') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge]}>pending</Text>
          </View> : null
      }
      {
        (RequestStatus === 'Collected') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge]}>{RequestStatus}</Text>
          </View>
          : null
      }
      {
        (RequestStatus === 'Accepted') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge, { backgroundColor: '#aeee19' }]}>{RequestStatus}</Text>
          </View>
          : null
      }
      {
        (RequestStatus === 'Rejected') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge, { backgroundColor: '#e43333' }]}>{RequestStatus}</Text>
          </View> : null
      }
      {
        (RequestStatus === 'Lab Received') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge, { backgroundColor: '#aeee19' }]}>Collected</Text>
            <Text style={[styles.badge, { backgroundColor: '#33e4af' }]}>{RequestStatus}</Text>
          </View>
          : null
      }
      {
        (RequestStatus === 'Report Dispatched') ?
          <View style={styles.badgeContainer}>
            <Text style={[styles.badge]}>pending</Text>
            <Text style={[styles.badge, { backgroundColor: '#aeee19' }]}>Collected</Text>
            <Text style={[styles.badge, { backgroundColor: '#33e4af' }]}>{RequestStatus}</Text>
            <Text style={[styles.badge, { backgroundColor: '#33bbe4' }]}>{RequestStatus}</Text>
          </View>
          : null
      }
    </>
  )
}

export default StatusBadge

const styles = StyleSheet.create({
  badgeContainer: {
    // paddingVertical: 3,
    // paddingHorizontal: 5,
    // margin: 3,
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#f3ff49',
    color: '#fefefe',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 20,
    fontSize: 10,
    margin: 2,
  },
})