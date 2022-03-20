export const DEV_URL = 'https://lunivacare.ddns.net/CarelabDataMetricService_qc/';

export const BASE_URL = `${DEV_URL}/Api/`;

export const GetValidCollectorLoginForApp ='GetValidCollectorLoginForApp';
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
 
