import {httpGet, httpPost} from "../index";

const BASE_URL = 'login';


export function loginPage(requestParam) {
    return httpPost(BASE_URL, requestParam)

}