
import { AssignCollectorForSampleCollection, GetCollectionRequestPatientDetails, GetReferredDoctorListForCollector, GetRequestorForCollection, GetTestListforHomeCollection, InsertUpdateHomeCollectionRequest } from '../constants/url';
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
      }else{
        console.log('big big error')
      }
    }catch(error){

    }
  
  }
}