// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect, useRef, useState } from 'react'
// import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { GetTokenByUserIdApi } from '../Services/appServices/loginService';
// import { GetUserTokenByUserId } from '../Services/constants/url';

export const PushNotification = async (task, fromSend, ToSend, Remarks) => {
  
  async function abcc() {
    let abv;
    let message = {};
    let data = {};
    await GetTokenByUserIdApi(ToSend, (res) => {
      // console.log('response', res?.userToken[0].UserToken);
      abv = res?.userToken[0].UserToken
      console.log('temp 1', abv);
      
    })
    console.log('temp 2', abv);
    toSendToken = abv

    if (task === 'rejected task') {
      console.log("asdfasdf", toSendToken);
      message = {
        to: abv,
        sound: 'default',
        title: `Sample Asigned by ${fromSend}`,
        body: Remarks,
        data: { someData: 'goes here' },
      };
      data = {
        "NId": 0,
        "UserIdFrom": fromSend,
        "UserIdTo": ToSend,
        "Title": "sample string 4",
        "NotificationDesc": "sample string 5",
        "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
        "NotficationPathName": "sample string 7",
        "IsSeen": true
      }
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

  return 'data'
  }
  let a = await abcc()
  console.log("potato",a);
  // let geData = await GetTokenByUserIdApi(ToSend, (res) => {
  //   // console.log('response', res?.userToken[0].UserToken);
  //   let temp = res?.userToken[0].UserToken
  //   console.log('temp', temp);
  //   return
  // })
  // console.log("log 1", geData);


 
  // if (task === 'collected task') {
  //   message = {
  //     to: toSendToken,
  //     sound: 'default',
  //     title: `Sample Collected by ${fromSend}`,
  //     body: Remarks,
  //     data: { someData: 'goes here' },
  //   };
  //   data = {
  //     "NId": 0,
  //     "UserIdFrom": fromSend,
  //     "UserIdTo": ToSend,
  //     "Title": "sample string 4",
  //     "NotificationDesc": "sample string 5",
  //     "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
  //     "NotficationPathName": "sample string 7",
  //     "IsSeen": true
  //   }
  // }
  // if (task === 'Lab Dispatched task') {
  //   message = {
  //     to: toSendToken,
  //     sound: 'default',
  //     title: `Sample Dropped in lab by ${fromSend}`,
  //     body: Remarks,
  //     data: { someData: 'goes here' },
  //   };
  //   data = {
  //     "NId": 0,
  //     "UserIdFrom": fromSend,
  //     "UserIdTo": ToSend,
  //     "Title": "sample string 4",
  //     "NotificationDesc": "sample string 5",
  //     "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
  //     "NotficationPathName": "sample string 7",
  //     "IsSeen": true
  //   }
  //   data = {
  //     "NId": 0,
  //     "UserIdFrom": fromSend,
  //     "UserIdTo": ToSend,
  //     "Title": "sample string 4",
  //     "NotificationDesc": "sample string 5",
  //     "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
  //     "NotficationPathName": "sample string 7",
  //     "IsSeen": true
  //   }
  // }
  // if (task === 'Report Dispatched task') {
  //   message = {
  //     to: toSendToken,
  //     sound: 'default',
  //     title: `Report Done`,
  //     body: Remarks,
  //     data: { someData: 'goes here' },
  //   };
  //   data = {
  //     "NId": 0,
  //     "UserIdFrom": fromSend,
  //     "UserIdTo": ToSend,
  //     "Title": "sample string 4",
  //     "NotificationDesc": "sample string 5",
  //     "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
  //     "NotficationPathName": "sample string 7",
  //     "IsSeen": true
  //   }
  // }



}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


