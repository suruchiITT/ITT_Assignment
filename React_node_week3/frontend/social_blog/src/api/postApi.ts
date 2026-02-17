import { fetchClient } from "./fetchClient";

export const fetchFeedApi = async (page: number) => {
  return await fetchClient(`/posts/feed?page=${page}`);
};

export const createPostApi = async (formData: FormData) => {
  return await fetchClient(
    "/posts",

    {
      method: "POST",
      body: formData,
    },
  );
};

export const deletePostApi = async (postId: string) => {
  return await fetchClient(
    `/posts/${postId}`,

    {
      method: "DELETE",
    },
  );
};

export const editPostApi = async (
  postId: string,
  title: string,
  content: string,
) => {
  return await fetchClient(
    `/posts/${postId}`,

    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    },
  );
};
