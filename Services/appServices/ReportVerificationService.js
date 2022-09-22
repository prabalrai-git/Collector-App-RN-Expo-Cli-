import {
  GetFiscalYearCodeList,
  GetPatientSampleSummaryStatus,
  GetTestListToViewOrVerifyInSummaryReport,
  VerifyPatientReport,
} from "../constants/url";
import { generateUrlEncodedData } from "../utils/generateUrlEncodedData";
// import { fetch, store } from "../utils/httpUtil"
import { fetch, store } from "../utils/httpUtil";

// export const GetFiscalYear = (sucessCallback) => {
//   return async dispatch => {
//     try{
//       const response = await fetch(GetFiscalYearCodeList)
//       if(response?.status === 200){
//         sucessCallback(response?.data)
//       }else{
//         sucessCallback([])
//       }
//     }
//     catch (error) {

//     }
//   }
// }

export const GetFiscalYear = (sucessCallback) => {
  return async (dispatch) => {
    try {
      const response = await fetch(GetFiscalYearCodeList);
      // console.log('data', data);
      if (response?.status === 200) {
        // console.log('get toeken sucess');
        sucessCallback(response?.data);
      } else {
        // console.log('get toeken failed');
        sucessCallback([]);
      }
    } catch (error) {}
  };
};

// GetPatientSampleSummaryStatus
export const GetPatientSampleSummaryStatuS = (data, sucessCallback) => {
  // console.log("service data", data);
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetPatientSampleSummaryStatus}?from=${data.from}&to=${data.to}&fiscalyearId=${data.fiscalyearId}&testin=${data.testin}&testnotin=${data.testnotin}&diagnosisin=${data.diagnosisin}&diagnosisnotin=${data.diagnosisnotin}`
      );
      if (response?.status === 200) {
        // console.log('sucess', response?.data);
        sucessCallback(response?.data);
      } else {
      }
    } catch (error) {}
  };
};

export const GetTestListToViewOrVerifyInSummaryReportS = (
  data,
  sucessCallback
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${GetTestListToViewOrVerifyInSummaryReport}?sampleid=${data.sampleid}&fiscalyear=${data.fiscalyear}`
      );
      if (response?.status === 200) {
        // console.log(response?.data);
        sucessCallback(response?.data);
      } else {
        sucessCallback([]);
      }
    } catch (error) {}
  };
};

export const PostVerifyPatientReport = (data, sucessCallback) => {
  // console.log("service data",data);
  let formData = generateUrlEncodedData(data);
  return async (dispatch) => {
    try {
      const response = await store(VerifyPatientReport, formData);
      if (response?.status === 200) {
        sucessCallback(response?.data);
      } else {
        sucessCallback([]);
      }
    } catch (error) {}
  };
};
