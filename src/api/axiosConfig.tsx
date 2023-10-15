import axios from 'axios';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const axiosConfig = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});
