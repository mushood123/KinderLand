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

export const uploadPDF = async (url, file, fileName = 'file', orderId) => {
  try {
    const formData = new FormData();

    // Handle React Native file object
    if (file && typeof file === 'object' && file.uri) {
      formData.append('file', file);
    } else {
      // Fallback for string paths (legacy support)
      formData.append('file', {
        uri: `file://${file}`,
        type: 'application/pdf',
        name: `${fileName}.pdf`,
      });
    }

    formData.append('order_number', orderId);

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

