import { fetch } from "../utils/httpUtil"

export const getLoginApi = (data, sucessCallback) => {
  return async dispatch => {
    try {
      const response = await fetch
      (`GetValidCollectorLoginForApp?username=${data.user}&password=${data.pass}`);
      if(response?.status === 200){
        sucessCallback(response?.data);
      }
      else{
        sucessCallback([])
      }
    }catch(error){

    }
  }
}