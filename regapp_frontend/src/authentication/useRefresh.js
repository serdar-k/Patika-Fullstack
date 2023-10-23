import axios from "axios";
import { loadRefreshToken } from "../context/localStore";
import { setToken } from "../lib/http";

export async function refreshTokenRequest() {
  const refToken = loadRefreshToken();
  console.log(refToken);
  const response = await axios.post(`/api/v1/auth/refresh-token`, null, {
    headers: {
      Authorization: `${refToken.prefix} ${refToken.token}`,
    },
  });

  setToken(response.data.access_token.token);
}
