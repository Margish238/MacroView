// services/api.js
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api'; // Adjust to your Django backend

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return axios.post(`${BASE_URL}/detect/`, formData);
};
