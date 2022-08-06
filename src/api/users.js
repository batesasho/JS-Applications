import * as api from './api.js'
import {clearUserData, setUserData} from "../util.js";


export async function login(email, password) {
    const result = await api.post('/users/login', {email, password});

    const userData = {
        id: result._id,
        email: result.email,
        accessToken: result.accessToken
    }
    setUserData(userData);
    return result;
}


export async function register(email, password) {
    const result = await api.post('/users/register', {email, password});

    const userData = {
        id: result._id,
        email: result.email,
        accessToken: result.accessToken
    }
    setUserData(userData);
    return result;
}

export function logout() {
    api.get('/users/logout');
    clearUserData();

}