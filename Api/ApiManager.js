import axios from "axios";

const ApiManager = axios.create({

    baseURL:"https://staging.dmexchange.com/api",
    responsetype: 'json',
    withCredentials: 'true',

});

export default ApiManager;
