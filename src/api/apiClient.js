import { axiosInstance } from './axiosInstance.js';

export const get = async (url, params = {}) => {
  try {
    const res = await axiosInstance.get(url, { params });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const post = async (url, data = {}) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const put = async (url, data = {}) => {
  try {
    const res = await axiosInstance.put(url, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const del = async url => {
  try {
    const res = await axiosInstance.delete(url);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const uploadFile = async (url, file, fileName = 'file') => {
  try {
    const formData = new FormData();
    formData.append(fileName, file);

    const res = await axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
