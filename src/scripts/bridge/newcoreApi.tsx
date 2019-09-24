import React from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import { apiUrl } from '../../configs/api.json';
import { requestingMockData } from './devUtils';
import MOCK_DATA from './MOCK_DATA.json';

import Err404 from '../partials/PagePartials/Errors/Err404';
import Err500 from '../partials/PagePartials/Errors/Err500';
import Err503 from '../partials/PagePartials/Errors/Err503';

export default function newcoreApi(params: AxiosRequestConfig) {
  let controllerUrl = params.url;
  params.url = `${apiUrl}${controllerUrl}`;
  
  if (requestingMockData()) {
    const data = findMockDataForUrl(controllerUrl);

    return {
      data,
      status: 200,
      mock: true,
    };
  } else {
    return axios(params);
  }
}

// each entry in this map is a key in the json file MOCK_DATA.json. the value is a regex against which the axios url will be matched 
const MOCK_DATA_PROVIDERS = {
  'notifications': /^\/notifications\/?$/,
  'messages': /^\/messages\/?$/,
  'thread': /^\/threads\/\d+\/?/,
}

function findMockDataForUrl(url: string) {
  for (let name in MOCK_DATA_PROVIDERS) {
    if (MOCK_DATA_PROVIDERS[name].exec(url)) {
      console.log(`Using mock data for ${name} ${url}.`);

      return MOCK_DATA[name];
    }
  }
}

export const ERROR_PAGES = {
  404: <Err404 />,
  500: <Err500 />,
  503: <Err503 />,
};

export type NewcoreErrorCode = keyof typeof ERROR_PAGES;

export function handleNewcoreError(e: Error, callback?: (err: NewcoreErrorCode) => void) {
  const errorMessage = e.toString();
  let code: NewcoreErrorCode = 500;

  if (errorMessage.match(/404/)) {
    code = 404;
  } else if (errorMessage.includes('Network Error')) {
    code = 503;
  }

  if (callback) {
    callback(code);
  }
  
  return code;
}