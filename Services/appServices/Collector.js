import { GetCurrentLocationOfCollector, GetListOfCollectors, GetlocationofCollectorByDate, InsertupdateCollectorLocationDetails, ReassignCollectorToRejectedSample } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, store } from "../utils/httpUtil";

//"LId": 1,
//"UserId": 2,
//"Latitude": "sample string 3",
//"Longitude": "sample string 4",
//"EntryDate": "2022-03-07T15:22:44.6967806+05:45",
// "ClientId": 6

export const UpdateCollectorLocation = (data, sucessCallback) => {
  return async dispatch => {
    try {
      // console.log('dispatch data', data)
      let formData = generateUrlEncodedData(data)
      // console.log("form data",formData);
      const response = await store(InsertupdateCollectorLocationDetails, formData);
      console.log("response", response)
      if (response?.status === 200) {
        sucessCallback(response?.data)
        console.log('sucess full')
      } else {
        sucessCallback([])
      }

    } catch (error) {

    }
  }
}

export const GetlocationofCollectorByDateAndUserId = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetlocationofCollectorByDate}?entrydate=${data.entrydate}&userId=${data.userId}`);
      if (response?.status === 200) {
        sucessCallback(response?.data)
        console.log('sucess full map data')
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const GetCurrentLocationOfuser = (data, sucessCallback) => {
  return async dispatch => {
    // console.log();
    try{
      const response = await fetch(`${GetCurrentLocationOfCollector}?userId=${data}`);
      if(response?.status === 200){
        sucessCallback(response?.data)
        console.log('sucessful in getting current location');
      }else{
        sucessCallback([])
        console.log('error getting current location')
      }
    }
    catch (error){

    }
  }
}

// GetListOfCollectors

export const GetListOfCollector = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(`${GetListOfCollectors}`);
      if(response?.status === 200){
        sucessCallback(response?.data)
        // console.log('sucessful in getting collector list');
      }else{
        sucessCallback([])
        console.log('error getting current list')
      }
    }
    catch (error){

    }
  }
}

export const ReassignCollectorToCollector = (data, sucessCallback) => {
  return async dispatch => {
    try{
      const response = await  store(`${ReassignCollectorToRejectedSample}?userId=${data.userId}&requestId=${data.requestId}&collectorId=${data.collectorId}&reqStatus=${data.reqStatus}&sampleStatus=${data.sampleStatus}&remarks=${data.remarks}`);
      if(response?.status === 200){
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }
    }catch (error){

    }
  }
}