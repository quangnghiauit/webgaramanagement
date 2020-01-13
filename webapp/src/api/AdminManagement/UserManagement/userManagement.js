import {httpGet, httpPost, httpDelete} from "../../index";

const BASE_URL = 'api/adminmanagement';

export function getUsers() {
    return httpGet(BASE_URL + "/get-users");
}

export function getInfoUser(userID) {
    return httpGet(BASE_URL + "/get-info-users?userID=" + userID);
}

export function addUser(reqPara) {
    return httpPost(BASE_URL + "/add-user", reqPara);
}

export function updateUser(userID, reqPara) {
    return httpPost(BASE_URL + "/update-user?userID=" + userID, reqPara);
}

export function deleteUser(reqPara) {
    return httpDelete(BASE_URL + "/delete-user?userID=" + reqPara);
}