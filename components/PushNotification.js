import * as Notifications from "expo-notifications";
import { GetTokenByUserIdApi } from "../Services/appServices/loginService";
import { InsertUpdateNotificationDetail } from "../Services/appServices/Notificationservice";

export const PushNotification = async (
  task,
  fromSend,
  ToSend,
  pathname,
  Remarks,
  fromName,
  RequestPatientname
) => {
  async function abcc(el) {
    let token;
    await GetTokenByUserIdApi(el, (res) => {
      // console.log('response', res?.userToken[0].UserToken);
      // console.log("deathTriggeggfhrd", res, "fgfg");

      token = res?.userToken[1].UserToken;
      // console.log('temp 1', abv);
    });

    return token;
  }

  let today = new Date();
  const newDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "T" +
    today.toLocaleTimeString();

  async function storeNotification(data) {
    // console.log(data);
    // return
    await InsertUpdateNotificationDetail(data, (res) => {
      // console.log('done');
    });
  }

  if (task === "rejected task") {
    let toSendToken = await abcc(ToSend);

    message = {
      to: toSendToken,
      sound: "default",
      title: `${fromName} rejected the task!`,
      body:
        Remarks === undefined || Remarks === ""
          ? `${fromName} rejeted the task of ${RequestPatientname}`
          : `Collector name:${RequestPatientname}, remarks: ${Remarks}`,
      data: {
        EntryDate: newDate,
        NotficationPathName: pathname,
      },
    };
    data = {
      NId: 0,
      UserIdFrom: fromSend,
      UserIdTo: ToSend,
      Title: `Task rejected by ${fromName} of ${RequestPatientname}`,
      NotificationDesc: Remarks,
      EntryDate: newDate,
      NotficationPathName: pathname,
      IsSeen: false,
    };
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === "asigned task") {
    let toSendToken = await abcc(ToSend);

    message = {
      to: toSendToken,
      sound: "default",
      title: `${fromName} assigned you task `,
      body:
        Remarks === undefined || Remarks === ""
          ? `please review the asigned task of ${RequestPatientname}`
          : `Patient name:${RequestPatientname}, remarks: ${Remarks}`,
      data: {
        EntryDate: newDate,
        NotficationPathName: pathname,
      },
    };
    data = {
      NId: 0,
      UserIdFrom: fromSend,
      UserIdTo: ToSend,
      Title: `${fromName} asigned you task ${RequestPatientname}`,
      NotificationDesc:
        Remarks === undefined || Remarks === ""
          ? `please review the assigned task of ${RequestPatientname}`
          : `Patient name:${RequestPatientname}, remarks: ${Remarks}`,
      EntryDate: newDate,
      NotficationPathName: pathname,
      IsSeen: false,
    };
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === "accepted task") {
    let toSendToken = await abcc(ToSend);

    message = {
      to: toSendToken,
      sound: "default",
      title: `${fromName} accepted task `,
      body:
        Remarks === undefined || Remarks === ""
          ? `${fromName} accepted task of ${RequestPatientname}`
          : `Patinet name:${RequestPatientname}, remarks: ${Remarks}`,
      data: {
        EntryDate: newDate,
        NotficationPathName: pathname,
      },
    };
    data = {
      NId: 0,
      UserIdFrom: fromSend,
      UserIdTo: ToSend,
      Title: `Task accepted`,
      NotificationDesc:
        Remarks === undefined || Remarks === ""
          ? `${fromName} accepted task of ${RequestPatientname}`
          : `Patinet name:${RequestPatientname}, remarks: ${Remarks}`,
      EntryDate: newDate,
      NotficationPathName: pathname,
      IsSeen: false,
    };
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  if (task === "sample collected") {
    let toSendToken = await abcc(ToSend);

    message = {
      to: toSendToken,
      sound: "default",
      title: `${fromName} collected sample `,
      body:
        Remarks === undefined || Remarks === ""
          ? `${fromName} collected sample of ${RequestPatientname}`
          : `Patinet name:${RequestPatientname}, remarks: ${Remarks}`,
      data: {
        EntryDate: newDate,
        NotficationPathName: pathname,
      },
    };
    data = {
      NId: 0,
      UserIdFrom: fromSend,
      UserIdTo: ToSend,
      Title: `${RequestPatientname} sample collected by ${fromName}`,
      NotificationDesc:
        Remarks === undefined || Remarks === ""
          ? `${fromName} collected sample of ${RequestPatientname}`
          : `Patinet name:${RequestPatientname}, remarks: ${Remarks}`,
      EntryDate: newDate,
      NotficationPathName: pathname,
      IsSeen: false,
    };
    // console.log('data', data);
    // return
    storeNotification(data);
  }

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
