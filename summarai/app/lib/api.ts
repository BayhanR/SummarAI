import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://f492-95-2-39-38.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek öncesi token ekleme
api.interceptors.request.use((config: any) => {
  if (typeof window !== 'undefined') { // Client-side kontrolü
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const makeApiCall = async (method: string, endpoint: string, data?: any) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    console.error('API çağrısı hatası:', error);
    throw error;
  }
};

export default api; 