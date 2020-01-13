import {httpGet, httpPost, httpDelete} from "../../index";

const BASE_URL = 'api/adminmanagement';

export function getRole() {
    return httpGet(BASE_URL + "/get-role");
}

export function addRole(reqPara) {
    return httpPost(BASE_URL + "/add-role?role=" + reqPara);
}

export function deleteRole(reqPara) {
    return httpDelete(BASE_URL + "/delete-role?role=" + reqPara);
}