import { getToken } from "../utils/token";

const BASE_URL = "http://localhost:5000/api";

export const fetchClient = async (
  endpoint: string,
  options: RequestInit = {}
) => {

  const token = getToken();

  const headers: Record<string,string> = {
    ...(options.headers as Record<string,string> || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(
    `${BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
};
