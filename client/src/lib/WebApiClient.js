import axios from 'axios';
import Config from 'Config';

const headers = {
  headers: { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
};

const multipartHeaders = {
  headers: { 
    'Content-Type': 'multipart/form-data',
  }
};

export class WebApiClient {
  get = async (url) => {
      return axios.get(`${Config.serverUrl}${url}`);
  }

  post = async (url, data, isMultipart) => {
    if (isMultipart) {
      return axios.post(`${Config.serverUrl}${url}`, data, multipartHeaders);
    }
    else {
      return axios.post(`${Config.serverUrl}${url}`, JSON.stringify(data), headers);
    }
  }
}

const webApiClient = new WebApiClient();

export default webApiClient;