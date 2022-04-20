// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export const PushNotification = async (task, fromSend, ToSend, Remarks) => {
  // handle notification on clik
  // props required, from ,to, task status might be assigned rejected drop
  // admin shoud get notification of rejected by whome
  // To user get notification on task asigned
  // to client get notification on sample collected, cample dropped in lab and report dispatched 
  // 
  console.log('asdfas', task, fromSend, ToSend, Remarks);
  // let toSendToken = ToSend
  let toSendToken = 'ExponentPushToken[ET7-LfDUYXePmkyQy8VyIl]';
  let message = {};

  if (task === 'rejected task') {
    message = {
      to: toSendToken,
      sound: 'default',
      title: `Sample rejected by ${fromSend}`,
      body: Remarks,
      data: { someData: 'goes here' },
    };
  }
  if (task === 'asigned task') {
    message = {
      to: toSendToken,
      sound: 'default',
      title: `Sample Asigned by ${fromSend}`,
      body: Remarks,
      data: { someData: 'goes here' },
    };
  }
  if (task === 'collected task') {
    message = {
      to: toSendToken,
      sound: 'default',
      title: `Sample Collected by ${fromSend}`,
      body: Remarks,
      data: { someData: 'goes here' },
    };
  }
  if (task === 'Lab Dispatched task') {
    message = {
      to: toSendToken,
      sound: 'default',
      title: `Sample Dropped in lab by ${fromSend}`,
      body: Remarks,
      data: { someData: 'goes here' },
    };
  }
  if (task === 'Report Dispatched task') {
    message = {
      to: toSendToken,
      sound: 'default',
      title: `Report Done`,
      body: Remarks,
      data: { someData: 'goes here' },
    };
  }



  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


