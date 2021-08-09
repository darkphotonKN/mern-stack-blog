import axios from 'axios';
import Router from 'next/router';

import { postAuth, fetchData } from '../api/helper';

// cookie is automatically passed in our headers after configuring axios, allowing checking for authenticated users who have their signed cookies intact
axios.defaults.withCredentials = true;

export const loginUser = async (username, password) => {
  const { data } = await postAuth('/api/login', { username, password });

  return data;
};

export const checkUserAuthenticated = async () => {
  const response = await fetchData('/api/profile');

  console.log('checkUserAuthenticated api/profile response:', response);
  return response;
};

export const logoutUser = () => {
  Router.push('/admin/login');
};
