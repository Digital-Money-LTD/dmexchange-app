import axios from "axios";

const baseURL = 'https://staging.dmexchange.com/api/';

function request(url) {
    const headers = {
        Accept: 'application/json',
    };
    const requestUrl = baseURL + url;

    return axios({
        method: 'GET',
        url: requestUrl,
        headers,
    });
}

function postRequest(url, params) {
    const headers = {
       // Accept: 'application/json',
        'Content-Type':"application/json", 
        'Accept':"application/json",
        'X-Requested-With':"XMLHttpRequest"
    };
    const requestUrl = baseURL + url;

    return axios({
        method: 'POST',
        url: requestUrl,
        data: params,
        headers,
    });
}

export {
    request,
    postRequest
};