import {
  createSlice,
  createAsyncThunk
} from "@reduxjs/toolkit";

import {
  fetchFeedApi,
  fetchPostApi,
  createPostApi,
  deletePostApi,
  likePostApi,
  unlikePostApi,
  addCommentApi,
  deleteCommentApi
} from "../../api/postApi";

export const fetchFeed = createAsyncThunk(
  "posts/feed",
  async (page: number) => {
    return await fetchFeedApi(page);
  }
);

export const fetchPost = createAsyncThunk(
  "posts/get",
  async (id: string) => {
    return await fetchPostApi(id);
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (formData: FormData) => {
    return await createPostApi(formData);
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string) => {
    await deletePostApi(id);
    return id;
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (id: string) => {
    return await likePostApi(id);
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlike",
  async (id: string) => {
    return await unlikePostApi(id);
  }
);

export const addComment = createAsyncThunk(
  "posts/comment",
  async ({ id, text }: any) => {
    return await addCommentApi(id, text);
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }: any) => {
    return await deleteCommentApi(postId, commentId);
  }
);

const postSlice = createSlice({

  name: "posts",

  initialState: {
    posts: [] as any[],
    post: null as any,
    page: 1,
    loading: false
  },

  reducers: {},

  extraReducers(builder) {

    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
    });

    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.unshift(action.payload);
    });

    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.posts =
        state.posts.filter(p => p._id !== action.payload);
    });

    builder.addCase(likePost.fulfilled, (state, action) => {
      const index =
        state.posts.findIndex(
          p => p._id === action.payload._id
        );
      if (index !== -1)
        state.posts[index] = action.payload;
    });

    builder.addCase(unlikePost.fulfilled, (state, action) => {
      const index =
        state.posts.findIndex(
          p => p._id === action.payload._id
        );
      if (index !== -1)
        state.posts[index] = action.payload;
    });

    builder.addCase(addComment.fulfilled, (state, action) => {
      const index =
        state.posts.findIndex(
          p => p._id === action.payload._id
        );
      if (index !== -1)
        state.posts[index] = action.payload;
    });

  }

});

export default postSlice.reducer;
