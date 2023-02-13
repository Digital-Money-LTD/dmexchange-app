import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURL = 'https://staging.dmexchange.com/api/';

export default function AuthUser(){ 
    const navigate = useNavigate();

    const getToken = () =>{
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    }

    const getUser = () =>{
        const userString = sessionStorage.getItem('user');
        const user_detail = JSON.parse(userString);
        return user_detail;
    }



    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user,token) =>{
        sessionStorage.setItem('token',JSON.stringify(token));
        sessionStorage.setItem('user',JSON.stringify(user));

        setToken(token);
        setUser(user);
        navigate('/dashboard');
    }

    const logout = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const http = axios.create({
        baseURL:"https://staging.dmexchange.com/api/",
        headers:{
            "Accept": "application/json",
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
        }
    });

    const getRequest = (url) => {
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

    const postRequest = (url, params) => {
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



    return {
        setToken:saveToken,
        token,
        getRequest,
        postRequest,
        user,
        getToken,
        http,
        logout
    }
}