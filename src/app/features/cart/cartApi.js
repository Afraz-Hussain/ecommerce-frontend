// cartApi.js
import axios from "axios";


const API = `${process.env.REACT_APP_API_URL}/backend/cart/create`;

export const addToCartAPI = (data, token) => {
  return axios.post(`${API}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCartAPI = (token) => {
  return axios.get(`${API}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
