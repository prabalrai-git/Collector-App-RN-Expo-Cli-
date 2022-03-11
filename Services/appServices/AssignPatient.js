
import { AssignCollectorForSampleCollection, GetCollectionRequestPatientDetails, GetReferredDoctorListForCollector, GetRequestorForCollection } from '../constants/url';
import { generateUrlEncodedData } from '../utils/generateUrlEncodedData';
import { store,fetch } from '../utils/httpUtil'

export const AssignPatient = (data, returnData) => {
  return async dispatch => {
    try {
      let formData = generateUrlEncodedData(data)
      const response = await store(AssignCollectorForSampleCollection, formData);
      if(response?.status === 200){
        returnData(response?.data)
        console.log('sucess full')
      }else{
        returnData([])
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