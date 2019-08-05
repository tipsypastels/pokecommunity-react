import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from '../../configs/api.json';

export default function newcoreApi(params: AxiosRequestConfig) {
  params.url = `${apiUrl}${params.url}`;
  return axios(params);
}