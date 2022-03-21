
import { AssignCollectorForSampleCollection, GetCollectionRequestPatientDetails, GetHomeCollectionTestRequestTestListByRequestId, GetReferredDoctorListForCollector, GetRequestorForCollection, GetSampleRequestListByCollectorIdAndDateRange, GetSampleRequestStatus, GetTestListforHomeCollection, InsertUpdateHomeCollectionRequest } from '../constants/url';
import { generateUrlEncodedData } from '../utils/generateUrlEncodedData';
import { store,fetch, storeNested } from '../utils/httpUtil'

export const AssignPatient = (data, returnData) => {
 
  return async dispatch => {
    
    try {
      let formData = generateUrlEncodedData(data)
      console.log(data);
      const response = await store(AssignCollectorForSampleCollection, formData);
      console.log(response);
      if(response?.status === 200){
        returnData(response?.data)
        console.log('sucess full', response?.status)
      }else{
        returnData([])
        // console.log('failure')
        console.log('failure', response?.status)
      }
      // returnData(response?.data)

    }catch(error){

    }
  }
}

export const GetPatientList = (sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetCollectionRequestPatientDetails}Id?id=0`);
      if(response?.status === 200){
        console.log('sucess');
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }

    }catch(error){

    }
  }
}

export const GetRequestor = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetRequestorForCollection);
      if(response?.status === 200){
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}


export const GetReferred = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetReferredDoctorListForCollector);
      if(response?.status === 200){
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}

// Boook test

export const GetTestList = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetTestListforHomeCollection);
      if(response?.status === 200){
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}

export const InsertUpdateHomeCollection = (data, returnData) => {
  return async dispatch => {
    console.log(data)
    try{
      const response = await storeNested(InsertUpdateHomeCollectionRequest, JSON.stringify(data))
      if(response?.status === 200){
        console.log('test added')
        returnData(response?.data)
      }else{
        console.log('big big error')
      }
    }catch(error){

    }
  
  }
}

export const GetStatus = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetSampleRequestStatus);
      if(response?.status === 200){
        sucessCallback(response?.data)
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}

export const GetSampleRequestListByCollector = (data, sucessCallback) => {
  console.log(data);
  return async dispatch => {
    try {
      const response = await fetch(`${GetSampleRequestListByCollectorIdAndDateRange}?collectorId=${data.collectorId}&fromdate=${data.fromDate}&todate=${data.toDate}`);
      if(response?.status === 200){
        sucessCallback(response?.data);
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}

export const GetHomeCollectionTestRequestTestList = (data, sucessCallback) => {
  console.log(data);
  return async dispatch => {
    try {
      const response = await fetch(`${GetHomeCollectionTestRequestTestListByRequestId}?requestId=${data}`);
      if(response?.status === 200){
        sucessCallback(response?.data);
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}