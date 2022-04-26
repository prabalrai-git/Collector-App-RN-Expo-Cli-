import { GetcollectorNotificationByUserId } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { fetch, store } from "../utils/httpUtil"

// export const getLoginApi = (data, sucessCallback) => {
//   return async dispatch => {
//     try {
//       const response = await fetch
//         (`${GetValidCollectorLoginForApp}?username=${data.user}&password=${data.pass}`);
//       if (response?.status === 200) {
//         sucessCallback(response?.data);

//       }
//       else {
//         sucessCallback([])
//       }
//     } catch (error) {

//     }
//   }
// }

export const GetNotificationByUserId = (data, sucessCallback) =>{
  return async dispatch => {
    try{
      const response = await fetch(`${GetcollectorNotificationByUserId}?uId=${data}`);
      if(response?.status === 200){
        sucessCallback(res?.data);
      }else{
        sucessCallback([])
      }
    }catch (error){

    }
  }
}