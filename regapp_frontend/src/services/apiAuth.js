import http from "../lib/http";

export async function signup({ username, email, password }) {
  const response = await http.post(
    "/api/v1/users/signup",
    {
      username,
      email,
      password,
    },
    {
      headers: {
        "Accept-Language": "tr",
      },
    }
  );
  console.log(response);
  return response;
}

export async function login({ email, password }) {
  const response = await http.post("/api/v1/auth/login", { email, password });
  return response;
}

export function logout() {
  localStorage.removeItem("auth");
}

export async function resetPassword({ oldpassword, newpassword }) {
  const response = await http.post(`/api/v1/auth/reset-password`, {
    oldPassword: oldpassword,
    newPassword: newpassword,
  });

  return response;
}
