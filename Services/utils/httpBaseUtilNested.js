import axios from 'axios'
import { BASE_URL } from '../constants/url'

function httpBaseUtilNested() {

  const headers = {
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    // 'Content-Type': 'text/plain',
    // Accept: 'application/json',
  }
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: headers,
    mode: 'no-cors',
  })

  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      return error;
    }
  );
  return instance;
}

export default httpBaseUtilNested