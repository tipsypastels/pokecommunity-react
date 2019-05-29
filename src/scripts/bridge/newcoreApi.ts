import axios from 'axios';

export default function newcoreApi(params: any) {
  // TODO https, and make this env var or something
  params.url = `http://development.pokecommunity.com:3001${params.url}`;
  return axios(params);
}