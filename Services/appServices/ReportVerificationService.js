
import { GetFiscalYearCodeList } from "../constants/url"
import { fetch, store } from "../utils/httpUtil"


// export const GetNotificationByUserId = (data, sucessCallback) => {
//   return async dispatch => {
//     try {
//       const response = await fetch(`${GetcollectorNotificationByUserId}?uId=${data}`)
//       if (response?.status === 200) {
//         // console.log('sucessfull noti');
//         sucessCallback(response.data)
//       } else {
//         // console.log("notification error")
//         sucessCallback([])
//       }
//     } catch (error) {

//     }
//   }

export const GetFicalYear = (data, sucessCallback) => {
  return async dispatch => {
    try{
      const response = await fetch(GetFiscalYearCodeList)
      // if(response)
    }
    catch (error) {

    }
  }
}
