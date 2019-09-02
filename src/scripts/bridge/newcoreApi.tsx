import React from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from '../../configs/api.json';

import Err404 from '../partials/PagePartials/Errors/Err404';
import Err500 from '../partials/PagePartials/Errors/Err500';
import Err503 from '../partials/PagePartials/Errors/Err503';

export default function newcoreApi(params: AxiosRequestConfig) {
  params.url = `${apiUrl}${params.url}`;
  return axios(params);
}

export type NewcoreErrorCode = null | 404 | 500 | 503;

export function handleNewcoreError(e: Error, callback?: (err: NewcoreErrorCode) => void) {
  const code = (function(errorMsg) {
    switch(true) {
      case !!errorMsg.toString().match(/404/): return 404;
      case errorMsg.includes('Network Error'): return 503;
      default: return 500;
    }
  })(e.toString());

  if (callback) {
    callback(code);
  }
  return code;
}

export const ERROR_PAGES = {
  404: <Err404 />,
  500: <Err500 />,
  503: <Err503 />,
};