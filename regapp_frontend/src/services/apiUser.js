import http from "../lib/http";

export async function getUser(id) {
  const response = await http.get(`/api/v1/users/${id.queryKey[1]}`);
  return response;
}
