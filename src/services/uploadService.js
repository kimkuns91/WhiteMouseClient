import axios from 'axios';
import API_URL from './apiConfig';

export const uploadImg = ({ formData }) => {
  return axios.post(API_URL + 'upload', formData);
};