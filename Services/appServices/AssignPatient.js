
import { AssignCollectorForSampleCollection, GetAddressOfClientByClientId, GetCollectionRequestHistoryByPatientId, GetCollectionRequestPatientDetails, GetCollectorRequestByCollectorWiseForWeekWithStatus, GetHomeCollectionTestRequestTestListByRequestId, GetMostPopularTestList, GetReferredDoctorListForCollector, GetRequestorForCollection, GetSampleRequestListByCollectorIdAndDateRange, GetSampleRequestStatus, GetTestListforHomeCollection, InsertUpdateHomeCollectionRequest, UpdateIsPaidStatusByCollector, UpdateSampleRequestStatus } from '../constants/url';
import { generateUrlEncodedData } from '../utils/generateUrlEncodedData';
import { store, fetch, storeNested } from '../utils/httpUtil'

export const AssignPatient = (data, returnData) => {

  return async dispatch => {

    try {
      let formData = generateUrlEncodedData(data)
      // console.log(data);
      const response = await storeNested(AssignCollectorForSampleCollection, JSON.stringify(data));
      // console.log(response);
      if (response?.status === 200) {
        returnData(response?.data)
      } else {
        returnData([])
      }
    } catch (error) {

    }
  }
}

export const GetPatientList = (sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetCollectionRequestPatientDetails}Id?id=0`);
      if (response?.status === 200) {
        console.log('sucess');
        sucessCallback(response?.data)
      } else {
        sucessCallback([])
      }

    } catch (error) {

    }
  }
}

export const GetRequestor = (sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(GetRequestorForCollection);
      if (response?.status === 200) {
        sucessCallback(response?.data)
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}


export const GetReferred = (sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(GetReferredDoctorListForCollector);
      if (response?.status === 200) {
        sucessCallback(response?.data)
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

// Boook test

export const GetTestList = (sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(GetTestListforHomeCollection);
      if (response?.status === 200) {
        sucessCallback(response?.data)
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const InsertUpdateHomeCollection = (data, returnData) => {
  return async dispatch => {
    console.log(data)
    try {
      const response = await storeNested(InsertUpdateHomeCollectionRequest, JSON.stringify(data))
      if (response?.status === 200) {
        console.log('test added')
        returnData(response?.data)
      } else {
        console.log('big big error')
      }
    } catch (error) {

    }

  }
}

export const GetStatus = (sucessCallback) => {
  return async dispatch => {

    try {
      const response = await fetch(GetSampleRequestStatus);
      if (response?.status === 200) {
        sucessCallback(response?.data)
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const UpdateStatus = (data, sucessCallback) => {
  return async dispatch => {
    // console.log('data', data);
    let formData = generateUrlEncodedData(data)
    try {
      const response = await store(UpdateSampleRequestStatus, formData);
      if (response?.status === 200) {
        sucessCallback(response?.data)
        console.log('sucess');
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}


export const GetSampleRequestListByCollector = (data, sucessCallback) => {
  // console.log(data);
  return async dispatch => {
    try {
      const response = await fetch(`${GetSampleRequestListByCollectorIdAndDateRange}?collectorId=${data.collectorId}&fromdate=${data.fromDate}&todate=${data.toDate}`);
      if (response?.status === 200) {
        sucessCallback(response?.data);
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const GetHomeCollectionTestRequestTestList = (data, sucessCallback) => {
  // console.log(data);
  return async dispatch => {
    try {
      const response = await fetch(`${GetHomeCollectionTestRequestTestListByRequestId}?requestId=${data}`);
      if (response?.status === 200) {
        sucessCallback(response?.data);
      } else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const GetAddressOfClient = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetAddressOfClientByClientId}?clientId=${data}`);
      if(response?.status === 200){
        // console.log('data found', response.data);
        sucessCallback(response?.data);
      }
      else{
        // console.log('data loss');
        sucessCallback([])
      }
    }
    catch (error){}
  }
} 

export const GetCollectorRequestByCollectorWiseForWeek = (data, sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(`${GetCollectorRequestByCollectorWiseForWeekWithStatus}?collectorId=${data}`)
      if(response?.status===200)
      {
        // console.log('data found', response?.data);
        sucessCallback(response?.data)
      }else{
        // console.log('no data found ss');
        sucessCallback([])
      }
    }
    catch (error){

    }
  }
}

export const GetCollectionRequestHistory = (data, sucessCallback) => {
  // console.log("data", data.patid, data.collectorId);
  return async dispatch => {
    try{
      // console.log("data 2", data.patid,  data.collectorId);
      const response = await fetch(`${GetCollectionRequestHistoryByPatientId}?patid=${data.patid}&collectorId=${data.collectorId}`)
      // console.log("data 3", response);
      if(response?.status === 200){
        console.log("sucess getting request history");
        sucessCallback(response?.data)
      }if(response?.status === 404){
        console.log('404 not found');
        sucessCallback([])
      }
      else{
        // console.log('error');
        sucessCallback([])
      }
    }catch (error){

    }
  }
}

export const UpdatePaidStatus = (data, sucessCallback) => {
  return async dispatch => {
    try{
      const response = await store(`${UpdateIsPaidStatusByCollector}?userId=${data.userId}&requestId=${data.requestId}&ispaid=${data.ispaid}&remarks=${data.remarks}`);

      if(response?.status === 200){
        // console.log("sucess", response?.data);
        sucessCallback(response?.data)
      }else{
        // console.log('error')
        sucessCallback([])
      }
    }
    catch (error){

    }
  }
}

export const MostPopularTestList = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(`${GetMostPopularTestList}`)

      if(response?.status === 200){
        sucessCallback(response?.data)
        // console.log('op op');
      }else{
        sucessCallback([])
      }
    }
    catch (error){

    }
  }
}