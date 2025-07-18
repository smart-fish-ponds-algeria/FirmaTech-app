import axios from 'axios';

const API_URL = 'http://192.168.1.198:8080'; 

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};
