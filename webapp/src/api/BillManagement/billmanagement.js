import {httpGet, httpPost} from "../index";

const BASE_URL = 'api/report-management';

export function getBillHandling() {
    return httpGet(BASE_URL + '/get-all-bill-handling')
}

export function getDetailBill(repairBillID) {
    return httpGet(BASE_URL + '/get-detail-bill?repairBillID=' + repairBillID)
}

export function getAllBillByUser(userID) {
    return httpGet(BASE_URL + '/get-all-bill-by-user?userID=' + userID)
}

export function getHistoryBill() {
    return httpGet(BASE_URL + '/get-all-bill')
}

export function searchRevenue(requestParams) {
    return httpPost(BASE_URL + '/search-revenue',requestParams);
}

export function searchInventory(requestParams) {
    return httpPost(BASE_URL + '/search-inventory',requestParams);
}

export function exportBill(requestParams) {
    return httpPost(BASE_URL + '/export-bill',requestParams);
}