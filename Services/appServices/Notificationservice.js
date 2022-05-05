
import { GetcollectorNotificationByUserId, GetSampleRequestDetailsByRequestId, InsertUpdateNotificationDetails, UpdateNotificationSeenFlag } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, store } from "../utils/httpUtil"


export const GetNotificationByUserId = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetcollectorNotificationByUserId}?uId=${data}`)
      if (response?.status === 200) {
        // console.log('sucessfull noti');
        sucessCallback(response.data)
      } else {
        // console.log("notification error")
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const InsertUpdateNotificationDetail = async (data, sucessCallback) => {
  // return async dispatch => {
  console.log('data', data);
  let formData = generateUrlEncodedData(data)
  console.log(formData)
  try {
    const response = await store(InsertUpdateNotificationDetails, formData)
    if (response?.status === 200) {
      console.log('sucessfull');
      sucessCallback(response?.status)
    } else {
      console.log("error");
      sucessCallback([])
    }
  } catch (error) {

    // }
  }
}

export const GetSampleRequestDetailsByRId = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetSampleRequestDetailsByRequestId}?rId=${data}`);
      if (response?.status === 200) {
        // console.log('suecess rid');
        sucessCallback(response?.data);
      } else {
        sucessCallback([]);
        // console.log('error rid');
      }
    } catch (errror) {

    }
  }
}

export const UpdateNotificationFlag = (data, sucessCallback) => {
  // console.log('not data', data);
  return async dispatch => {
    try {
      const response = await store(`${UpdateNotificationSeenFlag}?notificationId=${data}&isSeen=true`);
      if(response?.status === 200){
        // console.log('sucess notification flag');
        sucessCallback(response?.data)
      }else{
        // console.log('error notification flag');
        sucessCallback([])
      }

    } catch (error) {

    }
  }
}

