import { fetchClient } from "./fetchClient";

export const fetchProfileApi = async () => {
  return await fetchClient("/profile");
};

export const fetchUsersApi = async () => {
  return await fetchClient("/users");
};

export const followUserApi = async (id: string) => {
  return await fetchClient(`/follow/${id}`, {
    method: "POST"
  });
};

export const unfollowUserApi = async (id: string) => {
  return await fetchClient(`/follow/${id}`, {
    method: "DELETE"
  });
};
