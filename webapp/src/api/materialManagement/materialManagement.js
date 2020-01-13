import {httpGet, httpPost, httpDelete} from "../index";

const BASE_URL = 'api/material-management';

// export function getAllClient() {
//     return httpGet(BASE_URL + '/getallclient');
// }

export function getListMaterial() {
    return httpGet(BASE_URL + '/get-all-material');
}

export function getListAllMaterialName() {
    return httpGet(BASE_URL + '/get-all-material-by-all-num');

}

export function getListMaterialName() {
    return httpGet(BASE_URL + '/get-all-name-material');
}

export function addHistoryMaterial(requestParams) {
    return httpPost(BASE_URL + '/add-material', requestParams)

}

export function addMaterialName(mateName) {
    return httpPost(BASE_URL + '/add-name-material?mateName=' + mateName);

}