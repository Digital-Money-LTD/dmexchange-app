import axios from 'axios';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'https://staging.dmexchange.com/api/';

export default function AuthUser(){ 
    const navigate =  useNavigation();

    const getToken = async () => {
    const tokenString = await AsyncStorage.getItem('token');
    if (tokenString) {
        try {
            const userToken = JSON.parse(tokenString);
            return userToken;
        } catch (error) {
            console.log('Error parsing token:', error);
            return null;
        }
    } else {
        return null;
    }
}

const getUser = async () => {
    const userString =  await AsyncStorage.getItem('user');
    if (userString) {
        try {
            const user_detail = JSON.parse(userString);
            return user_detail;
        } catch (error) {
            console.log('Error parsing user:', error);
            return null;
        }
    } else {
        return null;
    }
}




    const [token,setToken] = useState(getToken());
    const [user,setUser] = useState(getUser());

    const saveToken = (user, token) => {
    if (user && token) {
        AsyncStorage.setItem('token', JSON.stringify(token));
        AsyncStorage.setItem('user', JSON.stringify(user));
        setToken(token);
        setUser(user);
        navigate('/dashboard');
    } else {
        console.log('Invalid user or token');
    }
    }


    const logout = () => {
        AsyncStorage.clear();
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
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
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
            Accept: 'application/json',
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`
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