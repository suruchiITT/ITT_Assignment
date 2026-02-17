// import {
//   createSlice,
//   createAsyncThunk
// } from "@reduxjs/toolkit";

// import {
//   fetchFeedApi,
//   createPostApi,
//   deletePostApi
// } from "../../api/postApi";

// export interface Post {

//   _id:string;

//   title:string;

//   content:string;

//   image?:string;

//   author:{
//     _id:string;
//     username:string;
//   };

// }

// interface PostState{

//   posts:Post[];

//   page:number;

//   loading:boolean;

//   hasMore:boolean;

// }

// const initialState:PostState={

//   posts:[],

//   page:1,

//   loading:false,

//   hasMore:true

// };

// export const fetchFeed=
// createAsyncThunk(

//   "posts/feed",

//   async(page:number)=>{

//     return await fetchFeedApi(page);

//   }

// );

// export const createPost=
// createAsyncThunk(

//   "posts/create",

//   async(formData:FormData)=>{

//     return await createPostApi(formData);

//   }

// );

// export const deletePost=
// createAsyncThunk(

//   "posts/delete",

//   async(postId:string)=>{

//     await deletePostApi(postId);

//     return postId;

//   }

// );

// const postSlice=
// createSlice({

//   name:"posts",

//   initialState,

//   reducers:{},

//   extraReducers(builder){

//     builder

//     .addCase(fetchFeed.pending,
//     state=>{

//       state.loading=true;

//     })

//     .addCase(fetchFeed.fulfilled,
//     (state,action)=>{

//       state.loading=false;

//       if(action.payload.length===0){

//         state.hasMore=false;

//       }
//       else{

//         state.posts=[

//           ...state.posts,

//           ...action.payload

//         ];

//         state.page+=1;

//       }

//     })

//     .addCase(createPost.fulfilled,
//     (state,action)=>{

//       state.posts.unshift(
//         action.payload.post
//       );

//     })

//     .addCase(deletePost.fulfilled,
//     (state,action)=>{

//       state.posts=
//       state.posts.filter(
//         post=>post._id!==action.payload
//       );

//     });

//   }

// });

// export default postSlice.reducer;

// import {
//   createSlice,
//   createAsyncThunk
// } from "@reduxjs/toolkit";

// import {
//   fetchFeedApi,
//   createPostApi,
//   deletePostApi,
//   editPostApi
// } from "../../api/postApi";

// import type {
//   Post
// } from "../../types/PostTypes";

// interface PostState{

//   posts:Post[];

//   page:number;

//   loading:boolean;

//   hasMore:boolean;

// }

// const initialState:PostState={

//   posts:[],

//   page:1,

//   loading:false,

//   hasMore:true

// };

// export const fetchFeed=
// createAsyncThunk(

//   "posts/fetchFeed",

//   async(page:number)=>{

//     return await fetchFeedApi(page);

//   }

// );

// export const createPost=
// createAsyncThunk(

//   "posts/createPost",

//   async(formData:FormData)=>{

//     return await createPostApi(formData);

//   }

// );

// export const deletePost=
// createAsyncThunk(

//   "posts/deletePost",

//   async(postId:string)=>{

//     await deletePostApi(postId);

//     return postId;

//   }

// );

// export const editPost=
// createAsyncThunk(

//   "posts/editPost",

//   async(payload:{postId:string; title:string; content:string})=>{

//     return await editPostApi(payload.postId, payload.title, payload.content);

//   }

// );

// const postSlice=
// createSlice({

//   name:"posts",

//   initialState,

//   reducers:{},

//   extraReducers(builder){

//     builder

//     .addCase(fetchFeed.pending,
//     state=>{

//       state.loading=true;

//     })

//     .addCase(fetchFeed.fulfilled,
//     (state,action)=>{

//       state.loading=false;

//       if(action.payload.length===0){

//         state.hasMore=false;

//       }
//       else{

//         state.posts=[

//           ...state.posts,

//           ...action.payload

//         ];

//         state.page+=1;

//       }

//     })

//     .addCase(createPost.fulfilled,
//     (state,action)=>{

//       state.posts.unshift(
//         action.payload.post
//       );

//     })

//     .addCase(deletePost.fulfilled,
//     (state,action)=>{

//       state.posts=
//       state.posts.filter(

//         post=>
//         post._id!==action.payload

//       );

//     })

//     .addCase(editPost.fulfilled,
//     (state,action)=>{

//       const index=
//       state.posts.findIndex(
//         post=>post._id===action.payload._id
//       );

//       if(index!==-1){

//         state.posts[index]=
//         action.payload;

//       }

//     });

//   }

// });

// export default postSlice.reducer;

// import {
//   createSlice,
//   createAsyncThunk
// } from "@reduxjs/toolkit";

// import {
//   fetchFeedApi,
//   createPostApi,
//   deletePostApi
// } from "../../api/postApi";

// import { fetchClient }
// from "../../api/fetchClient";

// import type {
//   Post
// } from "../../types/PostTypes";

// interface PostState {

//   posts: Post[];

//   page: number;

//   loading: boolean;

//   hasMore: boolean;

// }

// const initialState: PostState = {

//   posts: [],

//   page: 1,

//   loading: false,

//   hasMore: true

// };

// export const fetchFeed =
// createAsyncThunk(

//   "posts/fetchFeed",

//   async (page:number)=>{

//     return {

//       data: await fetchFeedApi(page),

//       page

//     };

//   }

// );

// export const createPost =
// createAsyncThunk(

//   "posts/createPost",

//   async (formData:FormData)=>{

//     return await createPostApi(formData);

//   }

// );

// export const deletePost =
// createAsyncThunk(

//   "posts/deletePost",

//   async (postId:string)=>{

//     await deletePostApi(postId);

//     return postId;

//   }

// );

// export const editPost =
// createAsyncThunk(

//   "posts/editPost",

//   async ({

//     postId,
//     title,
//     content

//   }:{

//     postId:string;
//     title:string;
//     content:string;

//   })=>{

//     const res =
//     await fetchClient(

//       `/posts/${postId}`,

//       {

//         method:"PUT",

//         body:JSON.stringify({

//           title,
//           content

//         })

//       }

//     );

//     return res.post;

//   }

// );

// const postSlice =
// createSlice({

//   name:"posts",

//   initialState,

//   reducers:{},

//   extraReducers(builder){

//     builder

//     .addCase(fetchFeed.pending,
//     (state)=>{

//       state.loading=true;

//     })

//     .addCase(fetchFeed.fulfilled,
//     (state,action)=>{

//       state.loading=false;

//       if(action.payload.page === 1){

//         state.posts = action.payload.data;

//       }
//       else{

//         state.posts = [

//           ...state.posts,
//           ...action.payload.data

//         ];

//       }

//       state.page =
//       action.payload.page + 1;

//     })

//     .addCase(createPost.fulfilled,
//     (state,action)=>{

//       state.posts.unshift(
//         action.payload.post
//       );

//     })

//     .addCase(deletePost.fulfilled,
//     (state,action)=>{

//       state.posts =
//       state.posts.filter(

//         post =>
//         post._id !== action.payload

//       );

//     })

//     .addCase(editPost.fulfilled,
//     (state,action)=>{

//       const index =
//       state.posts.findIndex(

//         post =>
//         post._id === action.payload._id

//       );

//       if(index !== -1){

//         state.posts[index] =
//         action.payload;

//       }

//     });

//   }

// });

// export default postSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { fetchFeedApi, createPostApi, deletePostApi } from "../../api/postApi";

import { fetchClient } from "../../api/fetchClient";

import type { Post } from "../../types/PostTypes";

interface PostState {
  posts: Post[];

  page: number;

  loading: boolean;

  hasMore: boolean;
}

const initialState: PostState = {
  posts: [],

  page: 1,

  loading: false,

  hasMore: true,
};

export const fetchFeed = createAsyncThunk(
  "posts/fetchFeed",

  async (page: number) => {
    const data = await fetchFeedApi(page);

    return {
      data,
      page,
    };
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",

  async (formData: FormData) => {
    const res = await createPostApi(formData);

    return res;
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",

  async (postId: string) => {
    await deletePostApi(postId);

    return postId;
  },
);

export const editPost = createAsyncThunk(
  "posts/editPost",

  async ({
    postId,
    title,
    content,
  }: {
    postId: string;
    title: string;
    content: string;
  }) => {
    const res = await fetchClient(
      `/posts/${postId}`,

      {
        method: "PUT",

        body: JSON.stringify({
          title,
          content,
        }),
      },
    );

    return res.post;
  },
);

const postSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder

      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.page === 1) {
          state.posts = action.payload.data;
        } else {
          state.posts = [...state.posts, ...action.payload.data];
        }

        state.page = action.payload.page + 1;
      })

      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload.post);
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })

      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id,
        );

        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export default postSlice.reducer;
