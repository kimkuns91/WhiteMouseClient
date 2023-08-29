import axios from 'axios';
import API_URL from './apiConfig';

export const createPost = ({ category, title, keyword, desc }) => {
    return axios.post(API_URL + 'post', { category, title, keyword, desc });
};
export const findPost = ({ id }) => {
    return axios.get(API_URL + `post/${id}`);
};
export const findAllPost = () => {
    return axios.get(API_URL + 'post');
};
export const updatePost = ({ id, category, title, keyword, desc }) => {
    return axios.put(API_URL + `post/${id}`, { category, title, keyword, desc });
};
export const deletePost = ({ id }) => {
    return axios.delete(API_URL + `post/${id}`);
};
export const postViewUp = ({ id }) => {
    return axios.put(API_URL + `post/views/${id}`);
};