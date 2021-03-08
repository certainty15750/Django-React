import BaseApi from './BaseApi'
import * as apiRoute from '../constants/apiRoutes';

const api = BaseApi.api;

export const getMe = () => {
  var enpoint = apiRoute.GET_ME;
  BaseApi.authToken=localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    return api.get(enpoint)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log('getMe========> error');
        reject(error);
      })
  })
}


export const createUser = (credentials) => {
  var enpoint = apiRoute.SAVE_USER;
  return new Promise((resolve, reject) => {
    return api.post(enpoint, credentials)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getElementCategories = () => {
  var enpoint = apiRoute.GET_ELEMENT_CATEGORY;
  BaseApi.authToken=localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    return api.get(enpoint)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const getTasks = (filter) => {
  var enpoint = apiRoute.GET_TASKS;
  BaseApi.authToken=localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    return api.get(enpoint, {params: filter})
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}

export const saveAnswer = (answer) => {
  var enpoint = apiRoute.SAVE_ANSWER;
  BaseApi.authToken=localStorage.getItem('access_token');
  return new Promise((resolve, reject) => {
    return api.post(enpoint, answer)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}