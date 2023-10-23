const defaultAuthState = { login: {} };

export function storeAuthState(auth) {
  if (auth) localStorage.setItem("auth", JSON.stringify(auth));
  else localStorage.setItem("auth", defaultAuthState);
}

export function loadAuthState() {
  const localAuthState = localStorage.getItem("auth");
  if (!localAuthState) return defaultAuthState;
  try {
    return JSON.parse(localAuthState);
  } catch {
    return defaultAuthState;
  }
}

export function storeToken(token) {
  if (token) localStorage.setItem("token", JSON.stringify(token));
  else localStorage.removeItem("token");
}

export function loadToken() {
  const localToken = localStorage.getItem("token");
  if (!localToken) return null;
  try {
    return JSON.parse(localToken);
  } catch {
    return null;
  }
}

export function storeRefreshToken(refToken) {
  if (refToken) localStorage.setItem("refToken", JSON.stringify(refToken));
  else localStorage.removeItem("refToken");
}

export function loadRefreshToken() {
  const localRefToken = localStorage.getItem("refToken");
  if (!localRefToken) return null;
  try {
    return JSON.parse(localRefToken);
  } catch {
    return null;
  }
}
