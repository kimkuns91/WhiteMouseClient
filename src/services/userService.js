import axios from 'axios';
import API_URL from './apiConfig';

export const createUser = ({ email, username, password }) => {
    return axios.post(API_URL + 'user', { email, username, password });
};
export const findUser = ({ id }) => {
    return axios.get(API_URL + `user/${id}`);
};
export const updateUser = () => {
    return axios.put(API_URL + 'user');
};
export const deleteUser = (id) => {
    return axios.delete(API_URL + `user/${id}`);
};