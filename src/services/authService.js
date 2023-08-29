import axios from 'axios';
import API_URL from './apiConfig';
import authHeader from './authHeader';

export const signin = ({ email, password, autoLogin }) => {
    return axios.post(API_URL + 'auth', { email, password, autoLogin })
        .then((response) => {
            if (response.status === 200){
                localStorage.setItem('Tokens', JSON.stringify({
                    'accessToken': response.data.accessToken,
                    'refreshToken': response.data.refreshToken
                }))
            }
            return response.data;
        });
};
export const getAuth = () => {
    return axios.get(API_URL + "auth", { headers: authHeader() })
        .then((response) => {
            if (response.data.newAccessToken){
                localStorage.setItem('Tokens', JSON.stringify({
                    'accessToken': response.data.newAccessToken,
                    'refreshToken': response.data.refreshToken
                }))
            }
            return response.data;
        });
};
export const getUser = () => {
    return axios.get(API_URL + "auth/user", { headers: authHeader() })
        .then((response) => {
            if (response.data.newAccessToken){
                localStorage.setItem('Tokens', JSON.stringify({
                    'accessToken': response.data.newAccessToken,
                    'refreshToken': response.data.refreshToken
                }))
            }
            return response.data;
        });
};
