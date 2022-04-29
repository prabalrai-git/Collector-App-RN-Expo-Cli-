import { GetUserTokenByUserId, GetValidCollectorLoginForApp, InsertUpdateCollectorToken } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, store } from "../utils/httpUtil"

export const getLoginApi = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch
        (`${GetValidCollectorLoginForApp}?username=${data.user}&password=${data.pass}`);
      if (response?.status === 200) {
        sucessCallback(response?.data);

      }
      else {
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}

export const InsertUpdateToken = (data, sucessCallback) => {
  return async dispatch => {
    let formData = generateUrlEncodedData(data)
    // console.log('data', formData);
    try {
      const response = await store(InsertUpdateCollectorToken, formData);
      if (response?.status === 200) {
        sucessCallback(response?.data)
        // console.log('successfully inserted' )
      } else {
        sucessCallback([])
        // console.log('no no no inserted' )
      }
    } catch (error) {

    }
  }
}

export const GetTokenByUserIdApi = async (data, sucessCallback) => {
  // return async dispatch => {
    
    try {
      const response = await fetch(`${GetUserTokenByUserId}?uId=${data}`);
      // console.log('data', response?.status);
      if (response?.status === 200) {
        // console.log('get toeken sucess');
        sucessCallback(response?.data)
      } else {
        // console.log('get toeken failed');
        sucessCallback([])
      }
    } catch (error) {

    }
  // }
}
export const GetTokenByUserId = (data, sucessCallback) => {
  return async dispatch => {
    
    try {
      const response = await fetch(`${GetUserTokenByUserId}?uId=${data}`);
      // console.log('data', data);
      if (response?.status === 200) {
        // console.log('get toeken sucess');
        sucessCallback(response?.data)
      } else {
        // console.log('get toeken failed');
        sucessCallback([])
      }
    } catch (error) {

    }
  }
}