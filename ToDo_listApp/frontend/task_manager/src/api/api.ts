  // const BASE_URL = "http://172.23.0.159:5000/api";
 const BASE_URL = "http://localhost:5000/api";

export const apiRequest = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};
