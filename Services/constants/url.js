export const DEV_URL = 'https://lunivacare.ddns.net/CarelabDataMetricService_qc/';

export const BASE_URL = `${DEV_URL}/Api/`;

export const GetValidCollectorLoginForApp = 'GetValidCollectorLoginForApp';
/**
 * @desc: login username passeord
 * @param: ?username={userame} & ?Password={password}
 */


export const AssignCollectorForSampleCollection = 'AssignCollectorForSampleCollection'
/**
 * @desc: get item type
 * @param: {
  "CId": 1,
  "CollectorId": 2,
  "PatientFName": "sample string 3",
  "PatientMName": "sample string 4",
  "PatientLName": "sample string 5",
  "PatientAge": "sample string 6",
  "PatientGender": "sample string 7",
  "PatientEmailId": "sample string 8",
  "PatientAddress": "sample string 9",
  "PatientReferedBy": 10,
  "PatientRequestorBy": 11,
  "PatientNationalId": "sample string 12",
  "Remarks": "sample string 13",
  "EntryDate": "2022-03-07T15:17:07.2324977+05:45",
  "EnterBy": 15,
  "CollectionReqDate": "2022-03-07T15:17:07.2334899+05:45"
}
 */
export const GetCollectionRequestPatientDetails = 'GetCollectionRequestPatientDetailsBy'
/**
 * @desc: get patiet List for sample collection
 * @param: ?id={id}
 */

export const GetRequestorForCollection = 'GetRequestorForCollection'
/**
 * @desc: get requestor List for collector to select
 * @param: 
 */

export const GetReferredDoctorListForCollector = 'GetReferredDoctorListForCollector'

/**
 * @desc: get Referer List for collector to select
 * @param: 
 */

export const InsertupdateCollectorLocationDetails = 'InsertupdateCollectorLocationDetails'

/**
 * @desc: get Referer List for collector to select
 * @param: {
  "LId": 1,
  "UserId": 2,
  "Latitude": "sample string 3",
  "Longitude": "sample string 4",
  "EntryDate": "2022-03-07T15:22:44.6967806+05:45",
  "ClientId": 6
}
 */

export const GetlocationofCollectorByDate = 'GetlocationofCollectorByDate'

/**
 * @desc: get Referer List for collector to select
 * @param: ?entrydate={entrydate}&userId={userId}
 */

export const GetTestListforHomeCollection = 'GetTestListforHomeCollection'

/**
 * @desc: get Referer List for collector to select
 * @param: ?entrydate={entrydate}&userId={userId}
 */

export const InsertUpdateHomeCollectionRequest = 'InsertUpdateHomeCollectionRequest'

/**
 * @desc: book list of test of patien and billing
 * @param: 
 */
//  {
//   "_HomeRequest": {
//     "RId": 1,
//     "PatId": 2,
//     "TestTotalAmount": 3.0,
//     "CollectionCharge": 4.0,
//     "DiscountAmount": 5.0,
//     "GrandTotal": 6.0,
//     "Remarks": "sample string 7",
//     "UserId": 8,
//     "IsActive": true,
//     "CollectorId": 1
//   },
//   "_HomeCollectionTestList": [
//     {
//       "SId": 1,
//       "PatId": 2,
//       "RequestId": 3,
//       "TestId": 4,
//       "TestName": "sample string 5",
//       "TestPrice": 6.0,
//       "ClientId": 7,
//       "IsActive": true,
//       "EntryDate": "2022-03-20T11:18:35.1476613+05:45",
//       "UserId": 10
//     },
//     {
//       "SId": 1,
//       "PatId": 2,
//       "RequestId": 3,
//       "TestId": 4,
//       "TestName": "sample string 5",
//       "TestPrice": 6.0,
//       "ClientId": 7,
//       "IsActive": true,
//       "EntryDate": "2022-03-20T11:18:35.1476613+05:45",
//       "UserId": 10
//     },
//     {
//       "SId": 1,
//       "PatId": 2,
//       "RequestId": 3,
//       "TestId": 4,
//       "TestName": "sample string 5",
//       "TestPrice": 6.0,
//       "ClientId": 7,
//       "IsActive": true,
//       "EntryDate": "2022-03-20T11:18:35.1476613+05:45",
//       "UserId": 10
//     }
//   ]
// }

export const GetSampleRequestStatus = 'GetSampleRequestStatus'
/**
 * @desc: get sample request status
 * @param: 
 */
export const UpdateSampleRequestStatus = 'UpdateSampleRequestStatus'
/**
 * @desc: update sample request status
 * @param: {
 "SrId": 1,
 "RequestId": 2,
 "RequestStatusId": 3,
 "EntryDate": "2022-03-22T10:57:37.8717928+05:45",
 "UserId": 5,
 "Remarks": "sample string 6"
}
 */

export const GetSampleRequestListByCollectorIdAndDateRange = 'GetSampleRequestListByCollectorIdAndDateRange'
/**
 * @desc: get sample request list of collector *
 *  @param: ?collectorId={collectorId}&fromdate={fromdate}&todate={todate}
 */

export const GetHomeCollectionTestRequestTestListByRequestId = 'GetHomeCollectionTestRequestTestListByRequestId'
/**
 * @desc: get home collection test request test list by request ID *
 *  @param: ?requestId={requestId}
 */


export const GetAddressOfClientByClientId=  'GetAddressOfClientByClientId'

/**
 * @desc: get address of patient by patient ID *
 *  @param: ?clientId={clientId}
 */

export const  GetCollectorRequestByCollectorWiseForWeekWithStatus = 'GetCollectorRequestByCollectorWiseForWeekWithStatus'

/**
 * @desc: get list of request of week by collector id*
 *  @param: ?collectorId={collectorId}
 */


 export const GetCollectionRequestHistoryByPatientId = 'GetCollectionRequestHistoryByPatientId'
 /**
 * @desc: get list of total request of patient by client id and patient id*
 *  @param: ?patid={patid}&collectorId={collectorId}
 */

 export const UpdateIsPaidStatusByCollector = 'UpdateIsPaidStatusByCollector'
/**
 * @desc: update is paid status
 *  @param: ?userId={userId}&requestId={requestId}&ispaid={ispaid}&remarks={remarks}
 */