import { fetchClient } from "./fetchClient";

export const fetchFeedApi = async (page: number) => {
  return await fetchClient(`/posts/feed?page=${page}`);
};

export const fetchPostApi = async (id: string) => {
  return await fetchClient(`/posts/${id}`);
};

export const createPostApi = async (formData: FormData) => {
  return await fetchClient("/posts", {
    method: "POST",
    body: formData
  });
};

export const deletePostApi = async (id: string) => {
  return await fetchClient(`/posts/${id}`, {
    method: "DELETE"
  });
};

export const likePostApi = async (id: string) => {
  return await fetchClient(`/posts/${id}/like`, {
    method: "POST"
  });
};

export const unlikePostApi = async (id: string) => {
  return await fetchClient(`/posts/${id}/like`, {
    method: "DELETE"
  });
};

export const addCommentApi = async (
  id: string,
  text: string
) => {
  return await fetchClient(`/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify({ text })
  });
};

export const deleteCommentApi = async (
  postId: string,
  commentId: string
) => {
  return await fetchClient(
    `/posts/${postId}/comments/${commentId}`,
    { method: "DELETE" }
  );
};
