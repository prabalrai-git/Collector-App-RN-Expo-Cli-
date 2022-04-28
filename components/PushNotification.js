import * as Notifications from 'expo-notifications';
import { InsertUpdateNotificationDetail } from '../Services/appServices/Notificationservice';

export const PushNotification = async (task, fromSend, ToSend , pathname, Remarks, fromName, RequestPatientname) => {

  // async function abcc() {
  //   let abv;
  //   let message = {};
  //   let data = {};
  //   await GetTokenByUserIdApi(ToSend, (res) => {
  //     // console.log('response', res?.userToken[0].UserToken);
  //     abv = res?.userToken[0].UserToken
  //     console.log('temp 1', abv);

  //   })
  //   console.log('temp 2', abv);
  //   toSendToken = abv

  //   if (task === 'rejected task') {
  //     console.log("asdfasdf", toSendToken);
  //     message = {
  //       to: abv,
  //       sound: 'default',
  //       title: `Sample Asigned by ${fromSend}`,
  //       body: Remarks,
  //       data: { someData: 'goes here' },
  //     };
  //     data = {
  //       "NId": 0,
  //       "UserIdFrom": fromSend,
  //       "UserIdTo": ToSend,
  //       "Title": "sample string 4",
  //       "NotificationDesc": "sample string 5",
  //       "EntryDate": "2022-04-26T17:28:31.0709654+05:45",
  //       "NotficationPathName": "sample string 7",
  //       "IsSeen": true
  //     }
  //   }



  // await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message),
  // });

  // return 'data'
  // }

  // let a = await abcc()
  // console.log("potato",a);
  // console.log('potatp', task, fromSend, ToSend , pathname, Remarks);
  // return
  let today = new Date();
  const newDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + 'T' + today.toLocaleTimeString();

  async function storeNotification(data) {
    // console.log(data);
    // return
    await InsertUpdateNotificationDetail(data, (res) => {
      // console.log('done');
    })
  }

  if (task === 'rejected task') {
    // console.log("asdfasdf", toSendToken);
    // message = {
    //   to: toSendToken,
    //   sound: 'default',
    //   title: `Sample Asigned by ${fromSend}`,
    //   body: Remarks,
    //   data: { someData: 'goes here' },
    // };
    data = {
      "NId": 0,
      "UserIdFrom": fromSend,
      "UserIdTo": ToSend,
      "Title": `Task rejected by ${fromName} of ${RequestPatientname}`,
      "NotificationDesc": Remarks,
      "EntryDate": newDate,
      "NotficationPathName": pathname,
      "IsSeen": false
    }
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === 'asigned task') {
    // console.log("asdfasdf", toSendToken);
    // message = {
    //   to: toSendToken,
    //   sound: 'default',
    //   title: `Sample Asigned by ${fromSend}`,
    //   body: Remarks,
    //   data: { someData: 'goes here' },
    // };
    data = {
      "NId": 0,
      "UserIdFrom": fromSend,
      "UserIdTo": ToSend,
      "Title": `${fromName} asigned you task ${RequestPatientname}`,
      "NotificationDesc": Remarks === undefined || Remarks === ''?  'please review the asigned task.' : Remarks,
      "EntryDate": newDate,
      "NotficationPathName": pathname,
      "IsSeen": false
    }
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === 'accepted task') {
    // console.log("asdfasdf", toSendToken);
    // message = {
    //   to: toSendToken,
    //   sound: 'default',
    //   title: `Sample Asigned by ${fromSend}`,
    //   body: Remarks,
    //   data: { someData: 'goes here' },
    // };
    data = {
      "NId": 0,
      "UserIdFrom": fromSend,
      "UserIdTo": ToSend,
      "Title": `Task accepted`,
      "NotificationDesc": `${fromName} acceted the asigned task`,
      "EntryDate": newDate,
      "NotficationPathName": pathname,
      "IsSeen": false
    }
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === 'sample collected') {
    // console.log("asdfasdf", toSendToken);
    // message = {
    //   to: toSendToken,
    //   sound: 'default',
    //   title: `Sample Asigned by ${fromSend}`,
    //   body: Remarks,
    //   data: { someData: 'goes here' },
    // };
    data = {
      "NId": 0,
      "UserIdFrom": fromSend,
      "UserIdTo": ToSend,
      "Title": `${RequestPatientname} sample collected by ${fromName}`,
      "NotificationDesc": Remarks === undefined || Remarks === ''? `${fromName} acceted the asigned task`: Remarks,
      "EntryDate": newDate,
      "NotficationPathName": pathname,
      "IsSeen": false
    }
    // console.log('data', data);
    // return
    storeNotification(data);
  }



  // await fetch('https://exp.host/--/api/v2/push/send', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(message),
  // });


 


}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


