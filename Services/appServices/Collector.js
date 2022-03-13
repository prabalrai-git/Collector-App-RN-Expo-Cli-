import { InsertupdateCollectorLocationDetails } from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
import { store } from "../utils/httpUtil";

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
      console.log("form data",formData);
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