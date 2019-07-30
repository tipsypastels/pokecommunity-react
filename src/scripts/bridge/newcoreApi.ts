import axios, { AxiosRequestConfig } from 'axios';

export default function newcoreApi(params: AxiosRequestConfig) {
  // TODO https, and make this env var or something
  params.url = `http://localhost:3001${params.url}`;
  return axios(params);
}