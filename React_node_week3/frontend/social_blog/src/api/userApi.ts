import { fetchClient }
from "./fetchClient";

export const fetchProfileApi =
async ()=>{

  return await fetchClient(
    "/profile"
  );

};

export const updateProfileApi =
async (formData: FormData)=>{

  return await fetchClient(

    "/profile",

    {

      method:"PUT",

      body: formData

    }

  );

};

export const fetchUsersApi =
async ()=>{

  return await fetchClient(
    "/users"
  );

};

export const followUserApi =
async (userId: string)=>{

  return await fetchClient(

    `/follow/${userId}`,

    {

      method:"POST"

    }

  );

};

export const unfollowUserApi =
async (userId: string)=>{

  return await fetchClient(

    `/follow/${userId}`,

    {

      method:"DELETE"

    }

  );

};

export const fetchFollowersApi =
async ()=>{

  return await fetchClient(
    "/followers"
  );

};

export const fetchFollowingApi =
async ()=>{

  return await fetchClient(
    "/posts/following"
  );

};