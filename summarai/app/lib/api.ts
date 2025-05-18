import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: 'https://f492-95-2-39-38.ngrok-free.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

// İstek öncesi session kontrolü ve token ekleme
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Oturum bulunamadı. Lütfen giriş yapın.');
  }

  if (!config.headers) {
    config.headers = {};
  }

  // Session token'ı ekle
  config.headers.Authorization = `Bearer ${session.user?.token}`;
  
  return config;
});

export const makeApiCall = async (method: string, endpoint: string, data?: unknown) => {
  try {
    const response = await api({
      method,
      url: endpoint,
      data,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
    }
    console.error('API çağrısı hatası:', error);
    throw error;
  }
};

export default api; 