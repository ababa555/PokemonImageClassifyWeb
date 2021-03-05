import webApiClient from '../lib/WebApiClient';

export const predictAsync = async (value) => {
  const params = new FormData();
  params.append('file', value);
  return webApiClient.post('predict/', params, true)
};