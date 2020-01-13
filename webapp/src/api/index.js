import { message } from 'antd';
import { HOST_PORT } from '../config/hostport';
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.withCredentials = true;
let HOST_PORT_FINAL = HOST_PORT;

export function httpGet(url, body) {
    return callApi(url, 'GET', body);
}

export function httpPost(url, body) {
    return callApi(url, 'POST', body);
}

export function httpDelete(url, body) {
    return callApi(url, 'DELETE', body);
}

function callApi(url, method, body = null) {
    const headers = { 'Content-Type': 'application/json; charset=utf-8' };
    const meta = {
        method,
        headers,
    };
    if (body) {
        meta.data = JSON.stringify(body);
    }
    return axios(`${HOST_PORT_FINAL}/${url}`, meta) // eslint-disable-line
        .then(response => {
            // console.log("Success!", response);
            return response;
        }).catch((error) => {
            // console.log("fail!", error);
            message.error(error.response.statusText);
            return false;
        });
}


