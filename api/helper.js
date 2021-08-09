// import { getToken, logoutUser } from '../utils/auth';
import Router from 'next/router';
import axios from 'axios';

/**
 * POST for authenticated usage (does not check if user is authenticated)
 * @param endpoint - API request endpoint
 * @param payload - JS Object to POST to server
 */
export const postAuth = async (endpoint, payload) => {
  console.log('Post Login Obj:', payload);
  // const postObj = JSON.stringify({
  //   ...payload
  // });

  let response = [];

  try {
    response = await axios.post(endpoint, payload);
  } catch (err) {
    console.log(
      'Error caught with POST request (tokenless authentication):',
      err
    );
  }

  // Using Standard Fetch
  // const data = await fetch(`http://192.168.0.24:8185${endpoint}`, {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     Authorization:
  //       '59d5fd572aa045af.qAUBbuPoTdCIhjjuMtRnTCJhJHb3mFm2lxCNJLGI+nw+YrLHB9W78dp22DMElMPiq4n33JjoZsmLWN7B4IE6ZQNMHjR4oxcxZ+VHlm13hXU=.125F85AC83FD7438D5D69B72985EF012D76BF147FBA2D9B334B902B930B243B5'
  //   }
  // });

  console.log('Response Data:', response.data);
  return response;
};

/**
 * GET request without authentication.
 * @param endpoint - API request endpoint
 */
export const fetchPublicData = async (endpoint) => {
  let response = [];

  try {
    response = await api.get(endpoint);
  } catch (err) {
    console.log('Error caught with GET request (fn fetchData):', err);
    const { response = {} } = err;
    if (response.status === 403) {
      logoutUser().then(() => {
        Router.push('/login');
      });
    }
  }

  console.log('Response Data:', response);
  return await response.data;
};

/**
 * GET request with user token.
 * @param endpoint - API request endpoint
 */
export const fetchData = async (endpoint) => {
  let response = [];

  try {
    response = await axios.get(endpoint);
  } catch (err) {
    console.log('Error caught with GET request (fn fetchData):', err);

    if (err.response && err.response.status === 403) {
      // logoutUser().then(() => {
      // Router.push('/admin/login');
      // });
    }
  }

  console.log('Response Data:', response);
  return response.data;
};

/**
 * GET request with user token for logging out.
 * @param endpoint - API request endpoint
 */

export const fetchDataLogout = async (endpoint) => {
  // acquire user auth token
  const token = getToken();

  const headers = {
    headers: {
      Authorization: token
    }
  };

  let response = [];

  try {
    response = await api.get(endpoint, headers);
  } catch (err) {
    console.log('Error caught with GET request while logging out:', err);
  }

  // Using Standard Fetch
  // const data = await fetch(`http://192.168.0.24:8185${endpoint}`, {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     Authorization:
  //       '59d5fd572aa045af.qAUBbuPoTdCIhjjuMtRnTCJhJHb3mFm2lxCNJLGI+nw+YrLHB9W78dp22DMElMPiq4n33JjoZsmLWN7B4IE6ZQNMHjR4oxcxZ+VHlm13hXU=.125F85AC83FD7438D5D69B72985EF012D76BF147FBA2D9B334B902B930B243B5'
  //   }
  // });

  console.log('Response Data:', response);
  return response;
};

/**
 * POST request with user token.
 * @param endpoint - API request endpoint
 * @param payload - JS Object to POST to server
 */
export const postData = async (endpoint, payload) => {
  console.log('Post Obj:', payload);

  let token = '';
  let response = [];

  // const postObj = JSON.stringify(payload);
  // console.log('Post Obj after stringify:', postObj);

  try {
    response = await axios.post(endpoint, payload);
  } catch (err) {
    console.log('Error caught with POST request:', err);
  }

  console.log('Post Response:', response);
  return response;
};
