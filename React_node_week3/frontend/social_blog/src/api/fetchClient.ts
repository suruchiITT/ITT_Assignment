import { getToken } from "../utils/token";
import { BASE_URL } from "../utils/constants";

export const fetchClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const token = getToken();

  const headers: any = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}/api${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
