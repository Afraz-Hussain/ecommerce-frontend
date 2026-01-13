import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/backend',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axiosInstance;