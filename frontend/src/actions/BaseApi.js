import axios from 'axios';

import ApiConfig from '../constants/ApiConfig';

class BaseApi {

  _baseURL = ApiConfig.baseURL;
  _api = null;

  constructor() {
    const baseURL = this._baseURL;

    if(!this._api){
      this._api = axios.create({
        baseURL,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 60000,
      });
    }
  }

  get baseUrl() {
    return this._baseURL;
  }

  get api() {
    return this._api;
  }

  // get authToken() {
  //   return this._api.defaults.headers.common['Authorization'];
  // }

  set authToken(token) {
    if(token === null) {
      delete this._api.defaults.headers.common['Authorization'];
      return;
    }
    this._api.defaults.headers.common['Authorization'] = "JWT "+token;
  }
}

export default new BaseApi();
