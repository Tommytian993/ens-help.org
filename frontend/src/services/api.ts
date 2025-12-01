import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API 方法
export const provinceApi = {
  getAll: () => api.get('/api/provinces/'),
  getById: (id: number) => api.get(`/api/provinces/${id}/`),
  getCities: (id: number) => api.get(`/api/provinces/${id}/cities/`),
  getMapData: () => api.get('/api/provinces/map_data/'),
};

export const cityApi = {
  getAll: () => api.get('/api/cities/'),
  getById: (id: number) => api.get(`/api/cities/${id}/`),
  getByProvince: (provinceId: number) => api.get(`/api/cities/by_province/?province_id=${provinceId}`),
  getMapData: (id: number) => api.get(`/api/cities/${id}/map_data/`),
};

export const clinicApi = {
  getAll: () => api.get('/api/clinics/'),
  getById: (id: number) => api.get(`/api/clinics/${id}/`),
  getByCity: (cityId: number) => api.get(`/api/clinics/by_city/?city_id=${cityId}`),
};

export const healthLogApi = {
  getAll: () => api.get('/api/health-logs/'),
  getById: (id: number) => api.get(`/api/health-logs/${id}/`),
  create: (data: any) => api.post('/api/health-logs/', data),
  update: (id: number, data: any) => api.put(`/api/health-logs/${id}/`, data),
  delete: (id: number) => api.delete(`/api/health-logs/${id}/`),
};

export const memorialApi = {
  getAll: () => api.get('/api/memorials/'),
  getById: (id: number) => api.get(`/api/memorials/${id}/`),
  create: (data: any) => api.post('/api/memorials/', data),
  update: (id: number, data: any) => api.put(`/api/memorials/${id}/`, data),
  delete: (id: number) => api.delete(`/api/memorials/${id}/`),
};

export const userApi = {
  getCurrent: () => api.get('/api/users/current/'),
};

export default api;

