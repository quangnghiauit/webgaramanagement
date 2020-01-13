import { httpGet, httpPost} from "../index";

const BASE_URL = '';

export function getUserID() {
    return httpGet('api/auth/getID')
}