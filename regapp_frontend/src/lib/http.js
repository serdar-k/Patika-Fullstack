// ! BURADAKI TANIM ILE TUM REQUEST YA DA RESPONSE'LARDA ORTAK OLACAK OLAN HEADER VB. ALANLAR REQ. YA DA RES. ICERISINE EKLENIR

import axios from "axios";
import { loadToken, storeToken } from "../context/localStore";

const http = axios.create();

let authToken = loadToken();

export function setToken(token) {
  authToken = token;
  storeToken(token);
}

http.interceptors.request.use((config) => {
  if (authToken) {
    config.headers["Authorization"] = `${authToken.prefix} ${authToken.token}`;
  }

  return config;
});

export default http;
