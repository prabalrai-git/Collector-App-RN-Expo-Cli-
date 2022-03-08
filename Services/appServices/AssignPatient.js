
import { AssignCollectorForSampleCollection, GetRequestorForCollection } from '../constants/url';
import { generateUrlEncodedData } from '../utils/generateUrlEncodedData';
import { store } from '../utils/httpUtil'

export const AssignPatient = (data, returnData) => {
  return async dispatch => {
    try {
      let formData = generateUrlEncodedData(data)
      const response = await store(AssignCollectorForSampleCollection, formData);
      // if(response?.status === 200){
      //   sucessCallback(response?.data)
      // }else{
      //   sucessCallback([])
      // }
      returnData(response?.data)

    }catch(error){

    }
  }
}

export const GetRequestor = (sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetRequestorForCollection);
      if(response?.status === 200){
        // sucessCallback(response?.data)
        console.log(response?.data)
      }else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}