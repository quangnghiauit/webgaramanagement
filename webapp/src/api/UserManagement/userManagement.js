import {httpGet, httpPost} from "../index";

const BASE_URL = 'api/clientmanagement';

export function getAllClient() {
    return httpGet(BASE_URL + '/getallclient');
}

export function getInfoClient(userID) {
    return httpGet(BASE_URL + '/getinfoclient?userID=' + userID);
}

export function addClient(requestParam) {
    return httpPost(BASE_URL + '/addclient', requestParam)

}

export function updateClient(userID, requestParam) {
    return httpPost(BASE_URL + '/updateclient?userID=' + userID, requestParam)

}

// export function getInfoRole() {
//     return httpGet(BASE_URL);
// }

// export function getAppName() {
//     return httpGet(BASE_URL + '/appName');
// }
//
// export function getPmcId() {
//     return httpGet(BASE_URL + '/pmc');
// }
//
// export function getTransStatus() {
//     return httpGet(BASE_URL + '/transStatus');
// }
//
// export function getTransLogDetails(transId) {
//     return httpGet(BASE_URL + '/detail?transId='+transId);
// }
//
// export function exportTransLogFile(type, requestParams) {
//     let params = '';
//     Object.keys(requestParams).map(i => params += i+'='+requestParams[i]+'&');
//     return httpGet(BASE_URL + '/exporttranslog?type=' + type + '&' + params.substring(0, params.length - 1));
// }
//
// export function searchCardProfileLogByFilter(requestParams) {
//     return httpPost(BASE_URL + '/cardprofilelog', requestParams);
// }


